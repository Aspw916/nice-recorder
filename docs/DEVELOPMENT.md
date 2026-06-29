# Development Notes

## Current Code Shape

The repository contains an Electron application with:

- `main.js`: app window, native dialogs, screen source listing, file writes, and recording IPC handlers.
- `preload.cjs`: context-isolated API exposed as `window.electronAPI`.
- `dist/`: built renderer application loaded by `main.js`.

The original renderer source is not present in this recovered project. Treat `dist/` as the currently runnable UI baseline.

## Main Process Responsibilities

`main.js` owns native capabilities:

- Creates the `BrowserWindow`
- Loads `dist/index.html`
- Lists screens and windows using `desktopCapturer`
- Saves screenshots to `D:/NiceRecorder/Screenshots` by default
- Streams recording chunks to temporary WebM files
- Opens the output folder with the OS shell
- Shows the save dialog for final videos

## Renderer Bridge

`preload.cjs` exposes these APIs:

```js
window.electronAPI.getSources()
window.electronAPI.saveFile(data)
window.electronAPI.showSaveDialog()
window.electronAPI.selectDirectory()
window.electronAPI.saveScreenshot(buffer)
window.electronAPI.openFolder()
window.electronAPI.startStream()
window.electronAPI.writeChunk(buffer)
window.electronAPI.stopStream()
```

Keep `contextIsolation: true` enabled. Add new native features through preload APIs instead of enabling Node integration in the renderer.

## Recommended Next Refactor

For long-term maintainability:

1. Create a Vite renderer source tree under `src/`.
2. Move UI logic out of the built `dist/assets/*.js` files.
3. Add a build script that generates `dist/`.
4. Keep `main.js` and `preload.cjs` as the stable Electron shell.

## Local Run

```bash
npm install
npm run start
```

## Windows Packaging

```bash
npm run build:win
```

Release artifacts are written to `release/` and should be uploaded to GitHub Releases.
