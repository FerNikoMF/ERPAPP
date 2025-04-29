const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ALLOWED_URL } = require('./src/config');
require('./src/autostart');
require('./src/navigation');
require('./src/updater'); // 🔥 подключаем updater

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    kiosk: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadURL(ALLOWED_URL);
  mainWindow.setMenu(null);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
