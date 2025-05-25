import { ipcMain } from 'electron'
import { getImages } from './images'

ipcMain.handle('get-images', async (_, dirPath) => {
    return getImages(dirPath);
});