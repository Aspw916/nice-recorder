# Release Guide

## Repository Policy

Commit source files and documentation to Git. Do not commit packaged Electron output, Windows binaries, generated videos, screenshots, or `node_modules`.

The `.gitignore` file excludes the common generated artifacts.

## Versioning

Use semantic versions:

```text
v1.0.0
v1.1.0
v1.1.1
```

Update `package.json` before each release.

## Build

```bash
npm install
npm run build:win
```

The build output is created in `release/`.

The current Windows package is an unsigned zip build. If you later need a signed installer, add a code-signing certificate and re-enable executable signing in `package.json`.

## GitHub Release

Create a GitHub Release from the matching tag and upload the Windows package, for example:

```text
NiceRecorder-v1.0.0-win-x64.zip
```

Suggested release notes:

```markdown
## NiceRecorder v1.0.0

- Screen and window recording
- Screenshot capture
- Custom screenshot folder
- WebM output

Windows x64 build is attached below.
```
