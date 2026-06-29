const { contextBridge, ipcRenderer } = require("electron")
contextBridge.exposeInMainWorld("electronAPI", {
  getSources: () => ipcRenderer.invoke("get-sources"),
  saveFile: (data) => ipcRenderer.invoke("save-file", data),
  showSaveDialog: () => ipcRenderer.invoke("show-save-dialog"),
  selectDirectory: () => ipcRenderer.invoke("select-directory"),
  saveScreenshot: (buffer) => ipcRenderer.invoke("save-screenshot", buffer),
  openFolder: () => ipcRenderer.invoke("open-folder"),
  startStream: () => ipcRenderer.invoke("start-stream"),
  writeChunk: (buffer) => ipcRenderer.invoke("write-chunk", buffer),
  stopStream: (finalPath) => ipcRenderer.invoke("stop-stream", finalPath)
})
