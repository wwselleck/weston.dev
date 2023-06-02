---
published: true
title: "Run Vite dev server in a Docker container"
---

When running a Vite dev server inside of a docker container, the `--host` command should be passed to `vite` so that the server listens on all addresses, not just localhost.

`vite ./src --host`

The Node `net.Server` listens on `0.0.0.0` by default, but Vite's dev server sets `host` to `localhost` by default, so Vite needs to be told explicitly to listen on 0.0.0.0.
