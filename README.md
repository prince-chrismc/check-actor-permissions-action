# Check Actor Permissions Actopns

GitHub Action to check if an actor has a specific access to the repository.

Users have one of four permission levels for any repo:

- **none**: no access to a repo
- **read**: pull-only access to a repo
- **write**: pull and push access to a repo
- **admin**: pull, push, and administrator access to a repo.

This action will check on the current repo if the user has a high enough permission level based on a defined argument.

## Getting Started

To have an action to only pass if a user has write access to the repo, use the action as follows:

```yaml
steps:
  - name: Check if user has write access
    uses: lannonbr/repo-permission-check-action@v2
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      permission: write
```

### Conditionally Continue

```yaml
steps:
  - id: check
    continue-on-error: true
    uses: lannonbr/repo-permission-check-action@v3
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      permission: write
  - if: steps.check.outputs.permitted == 'true'
    uses: actions/checkout@v2
    with:
      token: ${{ secrets.PERSONAL_ACCESS_TOKEN }} # Typically this would fail on public forks as secret at not available
```
