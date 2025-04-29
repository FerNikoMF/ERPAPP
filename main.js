const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ALLOWED_URL } = require('./src/config');

require('./src/autostart');   
require('./src/navigation');  
require('./src/updater');     

const { autoUpdater } = require('electron-updater');

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

  // Масштабируем страницу на 90%
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setZoomFactor(0.9);
    // Скрываем скроллбары через CSS
    mainWindow.webContents.insertCSS(`
      ::-webkit-scrollbar {
        display: none !important;
      }
      body {
        overflow: hidden !important;
      }
    `);
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(ALLOWED_URL)) event.preventDefault();
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    if (!url.startsWith(ALLOWED_URL)) event.preventDefault();
  });

  autoUpdater.checkForUpdatesAndNotify();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
