---
title: e2e testing for Audiolinx
author: Tom Lamb
date: 13/09/2024
---
# e2e testing for Audiolinx project

This document describes the e2e testing process and setup.

## CI process

### ⬆️ [Playwright](../.github/workflows/playwright.yaml)
The setup for playwright in the CI process is pretty standard 
- Checkout the repository, 
- Install dependencies, 
- Run tests 
- Upload the results to the github artifacts

## Local
In the local development environment, the e2e tests are run against a local server at `http://localhost:3000` so you might get an error if you are already running a dev server locally. 

``` bash
pnpm test:e2e
```

## Tests
In the following section we will look at how to write an e2e test for a specific user. 