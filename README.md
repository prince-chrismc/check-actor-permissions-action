<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Create a JavaScript Action using TypeScript

Use this template to bootstrap the creation of a TypeScript action.:rocket:

This template includes compilation support, tests, a validation workflow, publishing, and versioning guidance.  

If you are new, there's also a simpler introduction.  See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Getting Started

To have an action to only pass if a user has write access to the repo, I can use the action as follows:

```yaml
steps:
  - name: "Check if user has write access"
    uses: lannonbr/repo-permission-check-action@v2
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      permission: "write"
```

### Conditionally Continue

```yaml
steps:
  - id: check
    uses: lannonbr/repo-permission-check-action@v3
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      permission: "write"
      fail: "false"
  - if: steps.check.outputs.permitted == 'true'
    uses: actions/checkout@v2
    with:
      token: ${{ secrets.PERSONAL_ACCESS_TOKEN }} # Typically this would fail on public forks as secret at not available
```
