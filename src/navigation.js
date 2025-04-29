const { app, session } = require('electron');
const { ALLOWED_URL } = require('./config');

app.whenReady().then(() => {
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    if (!details.url.startsWith(ALLOWED_URL)) {
      return callback({ cancel: true });
    }
    callback({});
  });
});
