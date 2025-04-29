const { autoUpdater } = require('electron-updater');

autoUpdater.on('checking-for-update', () => {
  console.log('Проверка обновлений...');
});

autoUpdater.on('update-available', (info) => {
  console.log('Доступно обновление.', info);
});

autoUpdater.on('update-downloaded', (info) => {
  console.log('Обновление загружено, установка...');
  autoUpdater.quitAndInstall();
});
