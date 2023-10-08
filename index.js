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
        label: 'Version ' + app.getVersion() + ' Build 20231008',
        click() {
            changeLog()
        }
    }
]

var changeLogMsg = "Changes to " + app.getVersion();

const changelogOptions = {
    type: 'info',
    buttons: ['Close'],
    title: 'Changelog',
    message: changeLogMsg,
    detail: `
    - HOTFIX 2: Fixed issue with apworlds with single item categories not displaying locations.
    - HOTFIX 2: Added ability to supply game name and styling info from apworld prior to connecting.
    - HOTFIX: Fixed issue with apworlds with multiple item categories.
    - HOTFIX: Fixed issue where formatting without apworld could cause the tracker to break.
    - Location Marking Functional
    - Item Tracking Function
    - Chat Log Active (Chat disabled)
    - Added ability to style using .apworld
    - Added safety check to ensure connecting to Manual AP Game
    - Added ability to filter items by category
    - Added ability to search for checks by name
    
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

    win.loadFile('src/server.html')

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