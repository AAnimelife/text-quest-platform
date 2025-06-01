const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true
    }
  });

  const indexPath = url.format({
    pathname: path.join(__dirname, 'frontend/index.html'),
    protocol: 'file:',
    slashes: true
  });

  win.loadURL(indexPath);
  // win.webContents.openDevTools(); // включай, если нужно
}

app.whenReady().then(createWindow);
