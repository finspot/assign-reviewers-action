# Assign desired reviewers to PR

This action will assign the PR/issue to given users if they are requested reviewers.

## Inputs

## `who-to-assign`

**Required** The Github usernames of the persons to assign.

## Example usage

```
name: 'Assign reviewers'

on:
  pull_request:
    types: [review_requested]
    
jobs:
  assign-reviewers:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Assign reviewers
        uses: finspot/assign-reviewers-action@v1.0
        with:
          who-to-assign: TheoNoyau NoyauTheo
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
