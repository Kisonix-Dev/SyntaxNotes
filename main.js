const { app, BrowserWindow } = require('electron')
const path = require('path')

try {
	require('electron-reloader')(module, {
		watchRenderer: true,
	})
} catch (error) {
	console.log('Error electron-reloader:', error)
}

function createWindow() {
	const win = new BrowserWindow({
		width: 1280,
		height: 850,
		minWidth: 1000,
		minHeight: 500,
		resizable: true,
		fullscreenable: true,
		focusable: true,
		icon: path.join(__dirname, 'assets', 'icon.ico'),
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			preload: path.join(__dirname, 'preload.js'),
			hardwareAcceleration: true,
		},
	})

	win.removeMenu()
	win.loadFile('index.html')
}

app.whenReady().then(() => {
	createWindow()

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
