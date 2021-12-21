# Check Actor Permissions Action

GitHub Action to check if an actor has a specific access to the repository.

Users may one of [four permission levels](https://docs.github.com/en/rest/reference/collaborators#get-repository-permissions-for-a-user) for any repository:

- **none**: no access
- **read**: pull-only access
- **write**: pull and push access
- **admin**: pull, push, and administrator access

This action will check on the current repository if the actor has a high enough permission level based on the provided argument.

## Getting Started

To have an action that only passes if the actor has write access to the repo, use the action as follows:

```yaml
steps:
  - name: Check if user has write access
    uses: prince-chrismc/check-actor-permissions-action@v1
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      permission: write
```

### Conditionally Continue

To have the workflow change behavoirs depending on the actors permissions, use the action as follows:

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
