import * as core from '@actions/core'
import * as github from '@actions/github'

import {permitted} from './permitted'

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github_token', {required: true})
    const octokit = github.getOctokit(githubToken)
    const username: Readonly<string> = github.context.actor
    const argPerm = core.getInput('permission', {required: true}) // Permission level passed in through args

    const allowed = await permitted(octokit, github.context, argPerm)
    if (allowed) {
      core.info(`✔️ ${username} is permitted`)
      core.setOutput('permitted', 'true')
    } else {
      core.setFailed(
        `🚨 Insuffient Permissions! ${username} does not have ${argPerm} permissions`
      )
      core.setOutput('permitted', 'false')
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error)
  }
}

run()
