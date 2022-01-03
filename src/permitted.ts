import * as core from '@actions/core'
import {Context} from '@actions/github/lib/context'
import {GitHub} from '@actions/github/lib/utils'

// Permission levels - higher in the array have higher access to the repo.
const perms: readonly string[] = ['none', 'read', 'write', 'admin']

export async function permitted(
  octokit: InstanceType<typeof GitHub>,
  context: Context,
  requiredPermission: string
): Promise<boolean> {
  const response = await octokit.rest.repos.getCollaboratorPermissionLevel({
    ...context.repo,
    username: context.actor
  })

  const permission = response.data.permission // Permission level of actual actor

  const yourPermIdx = perms.indexOf(permission)
  const requiredPermIdx = perms.indexOf(requiredPermission)

  core.debug(`Actor Permission: ${permission}`)
  core.debug(`Required Permission: ${requiredPermission}`)

  // If the index of the current actor's permission is at least or greater than the required,
  // exit successfully.
  return yourPermIdx >= requiredPermIdx
}
