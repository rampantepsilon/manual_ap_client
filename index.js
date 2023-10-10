const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')
const path = require('path')

let template = [
    {
        label: 'App',
        submenu: [
            {
                label: 'Reset Tracker',
                role: 'reload',
                accelerator: 'F5'
            }, {
                label: 'Toggle Dev Tools',
                role: 'toggledevtools',
                accelerator: 'CommandOrControl+Alt+I',
                enabled: true,
                visible: false
            }, {
                label: 'Exit',
                role: 'quit',
                accelerator: 'Alt+F4'
            }
        ]
    }, {
        label: 'Version ' + app.getVersion() + ' Build 20231010',
        click() {
            changeLog()
        }
    }
]

var changeLogMsg = "Changes to " + app.getVersion() + "Build 20231010";

const changelogOptions = {
    type: 'info',
    buttons: ['Close'],
    title: 'Changelog',
    message: changeLogMsg,
    detail: `
    - Fixed issue where clicking _Manual_Game_Complete_ wouldn't mark all checks as found.
    - Fixed issue where items other player found for player connected wouldn't display properly.
    
    Upcoming Changes
    - Further formatting to clean up the appearance
    - Chat function
    - Hint Tracking`
}

//Function for Changelog
function changeLog() {
    dialog.showMessageBox(null, changelogOptions, (response, checkboxChecked) => { });
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 600,
        title: "KH2 AP Item Tracker",
        webPreferences: { nodeIntegration: 'true', },
    })

    win.loadFile('src/index.html')

    //win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})