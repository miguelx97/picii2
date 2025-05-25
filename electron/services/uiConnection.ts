import { ipcMain, BrowserWindow } from 'electron'
import { getImagesFromDb, getImagesFromDisk, updateImageStatus } from './images'
import { setupKeyboardLogging } from './keysHandler'
import { Image, ImageStatus } from '../models/image'

export function loadFunctions(win: BrowserWindow) {
    ipcMain.handle('get-images-from-disk', async (_, dirPath) => {
        return getImagesFromDisk(dirPath);
    });

    setupKeyboardLogging(win, (key) => {
        win.webContents.send('key-pressed', key);
    });

    ipcMain.handle('update-image-status', async (_, name: string, status: ImageStatus) => {
        const image: Image = {
            name,
            like: status
        };
        return updateImageStatus(image);
    });

    ipcMain.handle('get-images-from-db', async () => {
        return getImagesFromDb();
    });
}

