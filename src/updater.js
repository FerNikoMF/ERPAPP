const { autoUpdater } = require('electron-updater');
const { dialog, app } = require('electron');

autoUpdater.autoDownload = true;

autoUpdater.on('checking-for-update', () => {
  console.log('🔍 Проверяю наличие обновлений...');
});

autoUpdater.on('update-available', (info) => {
  console.log('✨ Найдено обновление:', info.version);
});

autoUpdater.on('update-not-available', () => {
  console.log('✅ Обновлений нет.');
});

autoUpdater.on('error', (err) => {
  console.error('❌ Ошибка обновления:', err);
});

// Когда обновление скачано:
autoUpdater.on('update-downloaded', (info) => {
  const window = require('electron').BrowserWindow.getFocusedWindow();

  dialog.showMessageBox(window, {
    type: 'info',
    title: 'Доступно обновление!',
    message: `Версия ${info.version} загружена и готова к установке.`,
    buttons: ['🔄 Обновить сейчас', '⏰ Обновить при следующем запуске'],
    cancelId: 1, // Второй вариант по умолчанию
  }).then((result) => {
    if (result.response === 0) {
      // Пользователь выбрал "Обновить сейчас"
      autoUpdater.quitAndInstall();
    } else {
      // Пользователь выбрал "Обновить при следующем запуске"
      app.on('before-quit', () => {
        autoUpdater.quitAndInstall();
      });
    }
  });
});

// Проверяем наличие обновлений сразу после запуска приложения
app.on('ready', () => {
  autoUpdater.checkForUpdates();
});
