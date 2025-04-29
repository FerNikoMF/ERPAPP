const { autoUpdater } = require('electron-updater');

// Проверка обновлений при запуске приложения
autoUpdater.checkForUpdatesAndNotify();

// События для логов
autoUpdater.on('checking-for-update', () => {
  console.log('Проверка обновлений...');
});

autoUpdater.on('update-available', (info) => {
  console.log('Доступно обновление:', info.version);
});

autoUpdater.on('update-not-available', () => {
  console.log('Обновлений нет.');
});

autoUpdater.on('error', (err) => {
  console.error('Ошибка при обновлении:', err);
});

autoUpdater.on('update-downloaded', () => {
  console.log('Обновление загружено, будет применено после перезапуска.');
});
