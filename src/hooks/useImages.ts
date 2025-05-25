import { useState, useEffect } from 'react';
import { getImagesFromDisk } from '../services/imagesService';

export const useImages = (imagesPath: string) => {
    const [images, setImages] = useState<string[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
    const [error, setError] = useState<string | null>(null);

    const handleImageSelect = (index: number) => {
        if (index >= 0 && index < images.length) {
            setSelectedImageIndex(index);
        }
    };

    const nextImage = () => {
        const newIndex = selectedImageIndex + 1;
        if (newIndex < images.length) {
            handleImageSelect(newIndex);
        }
    };

    const previousImage = () => {
        const newIndex = selectedImageIndex - 1;
        if (newIndex >= 0) {
            handleImageSelect(newIndex);
        }
    };

    useEffect(() => {
        const loadImages = async () => {
            try {
                const imageFiles: string[] = await getImagesFromDisk(imagesPath);
                setImages(imageFiles);
                if (imageFiles.length > 0) {
                    setSelectedImageIndex(0);
                } else {
                    setSelectedImageIndex(-1);
                }
                setError(null);
            } catch (err) {
                setError("Failed to load images. Please check the directory path.");
                console.error("Error loading images:", err);
                setSelectedImageIndex(-1);
            }
        };

        loadImages();
    }, [imagesPath]);

    return {
        images,
        selectedImage: selectedImageIndex >= 0 ? images[selectedImageIndex] : undefined,
        error,
        handleImageSelect,
        nextImage,
        previousImage
    };
};
