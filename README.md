# NiceRecorder

NiceRecorder is a lightweight desktop screen recorder for Windows, built with Electron.

It can capture screens or windows, record WebM video, take screenshots, choose an output folder, and open the saved media folder from the app.

## Status

This repository was prepared from the packaged Electron application. The Electron main process and preload bridge are editable source files. The renderer UI currently lives in `dist/` as a built Vite bundle.

For deeper frontend changes, the recommended next step is to restore or rebuild the original renderer source under `src/`, then generate `dist/` from that source.

## Features

- Screen and window source selection through Electron `desktopCapturer`
- WebM screen recording
- Screenshot capture
- Configurable screenshot output folder
- Native save dialog for recorded videos
- Context-isolated preload bridge

## Project Structure

```text
.
|-- main.js                  # Electron main process
|-- preload.cjs              # Secure renderer-to-main IPC bridge
|-- dist/                    # Built renderer UI
|-- docs/                    # Development and release notes
|-- skills/nice-recorder-dev # AI agent development skill
`-- package.json
```

## Development

Install dependencies:

```bash
npm install
```

Run the desktop app:

```bash
npm run start
```

Build a Windows release package:

```bash
npm run build:win
```

The packaged output is written to `release/`.

## GitHub Release Workflow

Use the GitHub repository for source code. Put downloadable Windows builds in GitHub Releases instead of committing packaged Electron binaries into Git.

Suggested first release asset:

```text
NiceRecorder-v1.0.0-win-x64.zip
```

## Publish to GitHub

Create an empty GitHub repository named `nice-recorder`, then run:

```bash
git add .
git commit -m "Initial open source release"
git branch -M main
git remote add origin https://github.com/<your-name>/nice-recorder.git
git push -u origin main
```

To publish a versioned build:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## License

MIT
