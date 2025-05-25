import { ipcMain, BrowserWindow } from 'electron'
import { getImagesFromDb, getImagesFromDisk, updateImageStatus } from './images'
import { setupKeyboardLogging } from './keysHandler'

export function loadFunctions(win: BrowserWindow) {
    ipcMain.handle('get-images-from-disk', async (_, dirPath) => {
        return getImagesFromDisk(dirPath);
    });

    setupKeyboardLogging(win, (key) => {
        win.webContents.send('key-pressed', key);
    });

    ipcMain.handle('update-image-status', async (_, name, status) => {
        return updateImageStatus(name, status);
    });

    ipcMain.handle('get-images-from-db', async () => {
        return getImagesFromDb();
    });
}

