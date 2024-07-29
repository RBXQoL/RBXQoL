const { app, BrowserWindow } = require('electron')
const RPC = require('discord-rpc');
const fetch = require('node-fetch');

// DO NOT ENABLE IN PRODUCTION UNLESS FIXED!
//function createWindow () {
//  const win = new BrowserWindow({
//    width: 800,
//    height: 600,
//    webPreferences: {
//      nodeIntegration: false,
//    }
//  })

  // win.loadURL('https://discord.gg/CYt3wMVBWr')
//}

//app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const clientId = '1189033992532545646'; // replace with your client ID
RPC.register(clientId);

const rpc = new RPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

rpc.on('ready', () => {
  rpc.setActivity({
    details: 'RBXQoL',
    state: 'v0.10.1',
    startTimestamp,
    largeImageKey: 'logo', // replace with your image key
    instance: false,
    buttons: [
      {
        label: 'Join Discord',
        url: 'https://rbxqol.com/discord',
      },
      {
        label: 'Our Website',
        url: 'https://rbxqol.com',
      }
    ],
  });
});

rpc.login({ clientId }).catch(console.error);