const { autoUpdater } = require('electron-updater');

autoUpdater.on('checking-for-update', () => {
  console.log('🔍 Проверка обновлений...');
});

autoUpdater.on('update-available', (info) => {
  console.log('✨ Доступно обновление:', info.version);
});

autoUpdater.on('update-not-available', () => {
  console.log('✅ Обновлений нет.');
});

autoUpdater.on('error', (err) => {
  console.error('❌ Ошибка обновления:', err);
});

autoUpdater.on('update-downloaded', () => {
  console.log('⬇️ Обновление скачано. Устанавливаю...');
  autoUpdater.quitAndInstall();
});
