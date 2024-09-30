import { app, BrowserWindow, shell } from 'electron';
import path from 'node:path';
import started from "electron-squirrel-startup"

if (started) {
  app.quit();
}
if (started) app.quit();
const createWindow = () => {

  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  })


  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

};

app.whenReady().then(() => {
  createWindow();
  mainWindow.maximize();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      mainWindow.maximize();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
