---
name: nice-recorder-dev
description: Work on the NiceRecorder Electron screen recorder, including IPC changes, recording flow updates, packaging, and release preparation.
---

# NiceRecorder Development Skill

Use this skill when modifying or packaging NiceRecorder.

## Project Map

- `main.js`: Electron main process, native dialogs, screen capture source listing, filesystem writes, and recording IPC handlers.
- `preload.cjs`: safe context bridge exposed to the renderer as `window.electronAPI`.
- `dist/`: current renderer UI bundle.
- `docs/DEVELOPMENT.md`: architecture and local development notes.
- `docs/RELEASE.md`: release checklist.

## Rules

1. Keep `contextIsolation: true`.
2. Do not enable `nodeIntegration` in the renderer.
3. Expose new native behavior through `preload.cjs`.
4. Add matching `ipcMain.handle(...)` handlers in `main.js`.
5. Keep generated binaries, videos, screenshots, `node_modules`, and `release/` out of Git.
6. Upload Windows builds to GitHub Releases instead of committing packaged output.

## Common Tasks

### Add a Native Capability

1. Add an `ipcMain.handle` in `main.js`.
2. Add a matching function to `window.electronAPI` in `preload.cjs`.
3. Update renderer usage.
4. Document the new API in `docs/DEVELOPMENT.md`.

### Run Locally

```bash
npm install
npm run start
```

### Build for Windows

```bash
npm run build:win
```

Check the `release/` folder and attach the packaged file to a GitHub Release.
