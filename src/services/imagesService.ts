import { Image, ImageStatus } from '../models/image';
import { getImagesFromDisk, getImagesFromDb, updateImageStatus } from './electronConnection';

export class ImageService {
    private static instance: ImageService;
    private imageCache: Map<string, Image> = new Map();

    private constructor() { }

    static getInstance(): ImageService {
        if (!ImageService.instance) {
            ImageService.instance = new ImageService();
        }
        return ImageService.instance;
    }

    async loadImages(dirPath: string): Promise<Image[]> {
        try {
            // Load images from disk and DB in parallel
            const [diskImages, dbImages] = await Promise.all([
                getImagesFromDisk(dirPath),
                getImagesFromDb()
            ]);

            // Create a map of DB images for quick lookup
            const dbImageMap = new Map(dbImages.map(img => [img.name, img]));

            // Merge disk and DB data
            const mergedImages = diskImages.map(name => {
                const dbImage = dbImageMap.get(name);
                return {
                    name,
                    like: dbImage?.like ?? ImageStatus.NONE
                };
            });

            // Update cache
            this.imageCache = new Map(mergedImages.map(img => [img.name, img]));

            return mergedImages;
        } catch (error) {
            console.error('Error loading images:', error);
            throw error;
        }
    }

    async updateImageStatus(name: string, status: ImageStatus): Promise<void> {
        await updateImageStatus(name, status);
        // Update cache
        const image = this.imageCache.get(name);
        if (image) {
            this.imageCache.set(name, { ...image, like: status });
        }
    }

    getImage(name: string): Image | undefined {
        return this.imageCache.get(name);
    }
}