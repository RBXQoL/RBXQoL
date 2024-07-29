const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    "api", {
    send: (channel, data) => {
        console.log(`sending ${data} to ${channel}`);
        let validChannels = ["toMain", "toMainUpdater"];
        if (validChannels.includes(channel)) {
            console.log(`approved sending ${JSON.stringify(data)} to ${channel}`);
            let response = ipcRenderer.send("toMain", data);
        }
    },
    receive: (channel, func) => {
        let validChannels = ["fromMain", "fromMainUpdater", "fromDebug"];
        console.log(`receiving from ${channel}`);
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
}
);

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerHTML = text;
    }

    let initVals = ipcRenderer.sendSync('getInitInfo', 'ping');
    let args = {};
    if (initVals.gCardName == 'Initializing...') {
        args.req = "[gf]";
        ipcRenderer.send("toMain", args);
    }
    contextBridge.exposeInMainWorld('initVals', initVals);
    args.req = "[gu]";
    ipcRenderer.send("toMain", args)
    switch (initVals.supported) {
        case 0:
            replaceText('supBadge', '<span class="badge text-white badge-danger">Unsupported</span>');
            break;
        case 1:
            replaceText('supBadge', '<span class="badge text-white badge-warning">Supported1</span>');
            break;
        case 2:
            replaceText('supBadge', '<span class="badge text-white badge-success">Supported2</span>');
            break;
        default:
            replaceText('supBadge', '<span class="badge text-white badge-warning">Loading</span>');
    }
})