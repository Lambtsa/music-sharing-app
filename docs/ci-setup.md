---
title: CI setup for Audiolinx
author: Tom Lamb
date: 28/09/2024
---
# CI setup for Order amendment Front project

This document describes how the CI for this project is setup and why it was setup this way.

## Workflows

There are **three** main workflows: 

### 🌴 [Branches build](../.github/workflows/branches_build.yaml)
>Branches build is triggered when there is a push done to either the `stable` or `main` branches. This will start a production build of the app using `project_build.yaml`. Furthermore, on `stable` branch we then publish the app to the `staging.audiolinx.xyz` subdomain and run e2e tests ([e2e docs](./e2e.md)).

### 🗒️ [Release](../.github/workflows/release.yaml)
>When a Release is published, `release.yaml` will start a production build, run testing and publish the build to the production environment of audiolinx at `audiolinx.xyz`

