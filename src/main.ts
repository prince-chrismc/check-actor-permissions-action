import * as core from '@actions/core'
import * as github from '@actions/github'

// Permission levels higher in the array have higher access to the repo.
const perms: readonly string[] = ['none', 'read', 'write', 'admin']

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github_token', { required: true })
    const octokit = github.getOctokit(githubToken)
    const username: Readonly<string> = github.context.actor

    const response = await octokit.rest.repos.getCollaboratorPermissionLevel({
      ...github.context.repo,
      username
    })

    const permission = response.data.permission // Permission level of actual user
    const argPerm = core.getInput('permission', { required: true }) // Permission level passed in through args

    const yourPermIdx = perms.indexOf(permission)
    const requiredPermIdx = perms.indexOf(argPerm)

    core.debug(`[Action] User Permission: ${permission}`)
    core.debug(`[Action] Minimum Action Permission: ${argPerm}`)

    // If the index of your permission is at least or greater than the required,
    // exit successfully.
    if (yourPermIdx < requiredPermIdx) {
      core.setFailed(
        `🚨 Insuffient Permissions! ${username} does not have ${argPerm} permissions`
      )
      core.setOutput('permitted', 'false')
      return
    }
    core.info(`✔️ ${username} is permitted`)
    core.setOutput('permitted', 'true')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error)
  }
}

run()
