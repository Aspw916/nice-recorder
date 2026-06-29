const { app, BrowserWindow, ipcMain, desktopCapturer, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: "Nice Recorder",
    backgroundColor: "#0a0a0c"
  });
  mainWindow.loadFile(path.join(__dirname, "dist/index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

let screenshotDir = "D:/NiceRecorder/Screenshots";
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
ensureDir(screenshotDir);

ipcMain.handle("get-sources", async () => {
  const sources = await desktopCapturer.getSources({ types: ["window", "screen"] });
  return sources.map(source => ({
    id: source.id,
    name: source.name,
    thumbnail: source.thumbnail.toDataURL()
  }));
});

ipcMain.handle("select-directory", async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
    title: "Select Directory",
    defaultPath: screenshotDir
  });
  if (filePaths.length > 0) {
    screenshotDir = filePaths[0];
    ensureDir(screenshotDir);
  }
  return screenshotDir;
});

ipcMain.handle("open-folder", () => shell.openPath(screenshotDir));

ipcMain.handle("save-screenshot", async (event, buffer) => {
  try {
    ensureDir(screenshotDir);
    const filename = `shot-${Date.now()}.png`;
    const fullPath = path.join(screenshotDir, filename);
    fs.writeFileSync(fullPath, Buffer.from(buffer));
    return { success: true, path: fullPath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

let activeStream = null;
let currentTempPath = null;

ipcMain.handle("start-stream", async () => {
  try {
    ensureDir("D:/NiceRecorder");
    const tempName = `temp-rec-${Date.now()}.webm`;
    currentTempPath = path.join("D:/NiceRecorder", tempName);
    activeStream = fs.createWriteStream(currentTempPath);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

ipcMain.handle("write-chunk", async (event, buffer) => {
  if (activeStream) {
    activeStream.write(Buffer.from(buffer));
    return { success: true };
  }
  return { success: false };
});

ipcMain.handle("stop-stream", async () => {
  if (activeStream) {
    activeStream.end();
    activeStream = null;
  }
  return { success: true };
});

ipcMain.handle("save-file", async (event, { filePath, buffer }) => {
  try {
    fs.writeFileSync(filePath, Buffer.from(buffer));
    if (currentTempPath && fs.existsSync(currentTempPath)) {
      fs.unlinkSync(currentTempPath);
      currentTempPath = null;
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle("show-save-dialog", async () => {
  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: "Save video",
    defaultPath: `vid-${Date.now()}.webm`
  });
  return filePath;
});
