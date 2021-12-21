# Check Actor Permissions Action

[![MIT](https://img.shields.io/github/license/prince-chrismc/check-actor-permissions-action)](https://github.com/prince-chrismc/check-actor-permissions-action/blob/main/LICENSE)
[![codecov](https://img.shields.io/codecov/c/github/prince-chrismc/check-actor-permissions-action)](https://codecov.io/gh/prince-chrismc/check-actor-permissions-action)

## Purpose

A GitHub Action to check if the current [actor](https://docs.github.com/en/graphql/reference/interfaces#actor) has a specific access to the repository.

Actors may one of [four permission levels](https://docs.github.com/en/rest/reference/collaborators#get-repository-permissions-for-a-user) for any repository:

- **none**: no access
- **read**: pull-only access
- **write**: pull and push access
- **admin**: pull, push, and administrator access

This action will check against the current repository if the actor has a high enough permission level based on the provided argument.

## Getting Started

To have an action that only passes if the actor has write access to the repo, use the action as follows:

```yaml
steps:
  - name: Enforce permission requirement
    uses: prince-chrismc/check-actor-permissions-action@v1
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      permission: write
```

### Conditionally Continue

To have the workflow change behaviors depending on the actor's permissions, use the action as follows:

```yaml
steps:
  - id: check
    continue-on-error: true
    uses: prince-chrismc/check-actor-permissions-action@v1
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      permission: write
  - if: steps.check.outputs.permitted == 'true'
    uses: actions/checkout@v2
    with:
      token: ${{ secrets.PERSONAL_ACCESS_TOKEN }} # Typically this would fail on public forks as secret at not available
```
