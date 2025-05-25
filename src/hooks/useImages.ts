import { useState, useEffect } from 'react';
import { Image, ImageStatus } from '../models/image';
import { ImageService } from '../services/imagesService';

export const useImages = (imagesPath: string) => {
    const [images, setImages] = useState<Image[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const imageService = ImageService.getInstance();

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

    const updateImageStatus = async (name: string, status: ImageStatus) => {
        try {
            console.log("Updating image status:", name, status);
            await imageService.updateImageStatus(name, status);
            setImages(prevImages =>
                prevImages.map(img =>
                    img.name === name ? { ...img, like: status } : img
                )
            );
        } catch (err) {
            setError("Failed to update image status");
            console.error("Error updating image status:", err);
        }
    };

    const likeImage = async () => {
        await updateImageStatus(images[selectedImageIndex].name, ImageStatus.LIKE);
    };

    const dislikeImage = async () => {
        await updateImageStatus(images[selectedImageIndex].name, ImageStatus.DISLIKE);
    };

    useEffect(() => {
        const loadImages = async () => {
            setIsLoading(true);
            try {
                const loadedImages = await imageService.loadImages(imagesPath);
                setImages(loadedImages);
                if (loadedImages.length > 0) {
                    setSelectedImageIndex(0);
                } else {
                    setSelectedImageIndex(-1);
                }
                setError(null);
            } catch (err) {
                setError("Failed to load images. Please check the directory path.");
                console.error("Error loading images:", err);
                setSelectedImageIndex(-1);
            } finally {
                setIsLoading(false);
            }
        };

        loadImages();
    }, [imageService, imagesPath]);

    return {
        images,
        selectedImage: selectedImageIndex >= 0 ? images[selectedImageIndex] : undefined,
        error,
        isLoading,
        handleImageSelect,
        nextImage,
        previousImage,
        likeImage,
        dislikeImage
    };
};
