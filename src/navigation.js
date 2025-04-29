const { app } = require('electron');
const { ALLOWED_URL } = require('./config');

app.on('web-contents-created', (_, contents) => {
  contents.on('will-navigate', (event, url) => {
    if (!url.startsWith(ALLOWED_URL)) event.preventDefault();
  });

  contents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(ALLOWED_URL)) return { action: 'deny' };
    return { action: 'allow' };
  });
});
