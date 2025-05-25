import fs from 'fs'
import path from 'path'
import { imageDb } from './db';
import { Image, ImageStatus } from '../models/image';

// Add this before app.whenReady().then(createWindow)
export const getImagesFromDisk = async (dirPath: string) => {
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

export const getImagesFromDb = async (): Promise<Image[]> => {
    try {
        const images = await imageDb.getAllImages();
        return images;
    } catch (error) {
        console.error('Error reading database:', error);
        throw error;
    }
}

export const updateImageStatus = async (image: Image): Promise<void> => {
    try {
        await imageDb.upsertImage(image);
    } catch (error) {
        console.error('Error updating image status:', error);
        throw error;
    }
}