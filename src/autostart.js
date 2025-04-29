const { app } = require('electron');
const AutoLaunch = require('auto-launch');

const autoLauncher = new AutoLaunch({
  name: 'ERP-App',
  path: app.getPath('exe'),
});

autoLauncher.isEnabled().then((isEnabled) => {
  if (!isEnabled) autoLauncher.enable();
}).catch(console.error);
