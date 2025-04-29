const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // добавьте свои методы для взаимодействия с сайтом
});
