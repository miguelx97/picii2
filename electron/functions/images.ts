import fs from 'fs'
import path from 'path'

// Add this before app.whenReady().then(createWindow)
export const getImages = async (dirPath: string) => {
    try {
        const files = await fs.promises.readdir(dirPath);
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg'].includes(ext);
        });
        return imageFiles;
    } catch (error) {
        console.error('Error reading directory:', error);
        throw error;
    }
}