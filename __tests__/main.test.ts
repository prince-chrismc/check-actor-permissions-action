import * as core from '@actions/core'
import * as github from '@actions/github'
import nock from 'nock'

import {permitted} from '../src/permitted'
import {
  expect,
  test,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  jest
} from '@jest/globals'

// Inputs for mock @actions/core
let inputs = {} as any

// Shallow clone original @actions/github context
let originalContext = {...github.context}

describe('queries', () => {
  beforeAll(() => {
    // Mock getInput
    jest.spyOn(core, 'getInput').mockImplementation((name: string) => {
      return inputs[name]
    })

    // Mock error/warning/info/debug
    jest.spyOn(core, 'error').mockImplementation(jest.fn())
    jest.spyOn(core, 'warning').mockImplementation(jest.fn())
    jest.spyOn(core, 'info').mockImplementation(jest.fn())
    jest.spyOn(core, 'debug').mockImplementation(jest.fn())
    jest.spyOn(core, 'startGroup').mockImplementation(jest.fn())
    jest.spyOn(core, 'endGroup').mockImplementation(jest.fn())
    jest.spyOn(core, 'setFailed').mockImplementation(jest.fn())

    // Mock github context
    jest.spyOn(github.context, 'repo', 'get').mockImplementation(() => {
      return {
        owner: 'some-owner',
        repo: 'some-repo'
      }
    })
    github.context.ref = 'refs/heads/some-ref'
    github.context.sha = '1234567890123456789012345678901234567890'
    github.context.eventName = 'push'
    github.context.actor = 'buster'
  })

  beforeEach(() => {
    // Reset inputs
    inputs = {}
    github.context.eventName = originalContext.eventName
    github.context.payload = originalContext.payload
  })

  afterAll(() => {
    // Restore @actions/github context
    github.context.ref = originalContext.ref
    github.context.sha = originalContext.sha
    github.context.eventName = originalContext.eventName
    github.context.actor = originalContext.actor

    // Restore
    jest.restoreAllMocks()
  })

  test('actor has sufficient access', async () => {
    const scope = nock('https://api.github.com', {
      reqheaders: {
        authorization: 'token justafaketoken'
      }
    })
      .get(
        `/repos/${github.context.repo.owner}/${github.context.repo.repo}/collaborators/${github.context.actor}/permission`
      )
      .reply(200, {
        permission: 'admin',
        user: {
          login: 'prince-chrismc',
          id: 16867443,
          node_id: 'MDQ6VXNlcjE2ODY3NDQz',
          avatar_url: 'https://avatars.githubusercontent.com/u/16867443?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/prince-chrismc',
          html_url: 'https://github.com/prince-chrismc',
          followers_url:
            'https://api.github.com/users/prince-chrismc/followers',
          following_url:
            'https://api.github.com/users/prince-chrismc/following{/other_user}',
          gists_url:
            'https://api.github.com/users/prince-chrismc/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/prince-chrismc/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/prince-chrismc/subscriptions',
          organizations_url: 'https://api.github.com/users/prince-chrismc/orgs',
          repos_url: 'https://api.github.com/users/prince-chrismc/repos',
          events_url:
            'https://api.github.com/users/prince-chrismc/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/prince-chrismc/received_events',
          type: 'User',
          site_admin: false,
          permissions: {
            admin: true,
            maintain: true,
            push: true,
            triage: true,
            pull: true
          },
          role_name: 'admin'
        },
        role_name: 'admin'
      })

    const octokit = github.getOctokit('justafaketoken')

    const permission = await permitted(octokit, github.context, 'write')
    expect(permission).toBe(true)
  })

  test('actor matches required access', async () => {
    const scope = nock('https://api.github.com', {
      reqheaders: {
        authorization: 'token justafaketoken'
      }
    })
      .get(
        `/repos/${github.context.repo.owner}/${github.context.repo.repo}/collaborators/${github.context.actor}/permission`
      )
      .reply(200, {
        permission: 'write',
        user: {
          login: 'prince-chrismc',
          id: 16867443,
          node_id: 'MDQ6VXNlcjE2ODY3NDQz',
          avatar_url: 'https://avatars.githubusercontent.com/u/16867443?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/prince-chrismc',
          html_url: 'https://github.com/prince-chrismc',
          followers_url:
            'https://api.github.com/users/prince-chrismc/followers',
          following_url:
            'https://api.github.com/users/prince-chrismc/following{/other_user}',
          gists_url:
            'https://api.github.com/users/prince-chrismc/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/prince-chrismc/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/prince-chrismc/subscriptions',
          organizations_url: 'https://api.github.com/users/prince-chrismc/orgs',
          repos_url: 'https://api.github.com/users/prince-chrismc/repos',
          events_url:
            'https://api.github.com/users/prince-chrismc/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/prince-chrismc/received_events',
          type: 'User',
          site_admin: false,
          permissions: {
            admin: false,
            maintain: false,
            push: true,
            triage: true,
            pull: true
          },
          role_name: 'write'
        },
        role_name: 'write'
      })

    const octokit = github.getOctokit('justafaketoken')

    const permission = await permitted(octokit, github.context, 'write')
    expect(permission).toBe(true)
  })

  test('actor is below required access', async () => {
    const scope = nock('https://api.github.com', {
      reqheaders: {
        authorization: 'token justafaketoken'
      }
    })
      .get(
        `/repos/${github.context.repo.owner}/${github.context.repo.repo}/collaborators/${github.context.actor}/permission`
      )
      .reply(200, {
        permission: 'read',
        user: {
          login: 'prince-chrismc',
          id: 16867443,
          node_id: 'MDQ6VXNlcjE2ODY3NDQz',
          avatar_url: 'https://avatars.githubusercontent.com/u/16867443?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/prince-chrismc',
          html_url: 'https://github.com/prince-chrismc',
          followers_url:
            'https://api.github.com/users/prince-chrismc/followers',
          following_url:
            'https://api.github.com/users/prince-chrismc/following{/other_user}',
          gists_url:
            'https://api.github.com/users/prince-chrismc/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/prince-chrismc/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/prince-chrismc/subscriptions',
          organizations_url: 'https://api.github.com/users/prince-chrismc/orgs',
          repos_url: 'https://api.github.com/users/prince-chrismc/repos',
          events_url:
            'https://api.github.com/users/prince-chrismc/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/prince-chrismc/received_events',
          type: 'User',
          site_admin: false,
          permissions: {
            admin: false,
            maintain: false,
            push: false,
            triage: true,
            pull: true
          },
          role_name: 'read'
        },
        role_name: 'read'
      })

    const octokit = github.getOctokit('justafaketoken')

    const permission = await permitted(octokit, github.context, 'write')
    expect(permission).toBe(false)
  })

  test('actor does not have push permissions', async () => {
    const scope = nock('https://api.github.com', {
      reqheaders: {
        authorization: 'token justafaketoken'
      }
    })
      .get(
        `/repos/${github.context.repo.owner}/${github.context.repo.repo}/collaborators/${github.context.actor}/permission`
      )
      .reply(403, {
        message: 'Must have push access to view collaborator permission.',
        documentation_url:
          'https://docs.github.com/rest/reference/repos#get-repository-permissions-for-a-user'
      })

    const octokit = github.getOctokit('justafaketoken')

    const permission = permitted(octokit, github.context, 'write')
    await expect(permission).rejects.toThrowError()
  })
})
