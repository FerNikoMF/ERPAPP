const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ALLOWED_URL } = require('./src/config');

require('./src/autostart');    // автозапуск
require('./src/navigation');   // защита навигации
require('./src/updater');      // логика обновлений

const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true, // 🔥 сразу в полный экран
    frame: false,     // 🔥 без панели окна
    kiosk: true,      // 🔒 не позволяет выйти из приложения
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Загружаем основной сайт
  mainWindow.loadURL(ALLOWED_URL);

  // Убираем стандартное меню
  mainWindow.setMenu(null);

  // Блокируем нежелательные переходы
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(ALLOWED_URL)) event.preventDefault();
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    if (!url.startsWith(ALLOWED_URL)) event.preventDefault();
  });

  // Проверка на обновления
  autoUpdater.checkForUpdatesAndNotify();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit(); // Полностью закрываем приложение
});
