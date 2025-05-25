import Datastore from 'nedb';
import { Image } from '../models/image';
import path from 'path';

class ImageDatabase {
    private db: Datastore<Image>;

    constructor() {
        this.db = new Datastore<Image>({
            filename: path.join(process.cwd(), 'data', 'images.db'),
            autoload: true
        });
    }

    // Save a new image
    async saveImage(image: Image): Promise<Image> {
        return new Promise((resolve, reject) => {
            this.db.insert(image, (err: Error | null, newDoc: Image) => {
                if (err) reject(err);
                resolve(newDoc);
            });
        });
    }

    // Update an existing image
    async updateImage(name: string, update: Partial<Image>): Promise<Image> {
        return new Promise((resolve, reject) => {
            this.db.update(
                { name },
                { $set: update },
                { returnUpdatedDocs: true },
                (err: Error | null, numAffected: number, affectedDocuments: Image) => {
                    if (err) reject(err);
                    resolve(affectedDocuments);
                }
            );
        });
    }

    // Delete an image by name
    async deleteImage(name: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.db.remove({ name }, {}, (err: Error | null, n: number) => {
                if (err) reject(err);
                resolve(n);
            });
        });
    }

    // Get all images
    async getAllImages(): Promise<Image[]> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err: Error | null, docs: Image[]) => {
                if (err) reject(err);
                resolve(docs);
            });
        });
    }

    // Find an image by name
    async findImageByName(name: string): Promise<Image | null> {
        return new Promise((resolve, reject) => {
            this.db.findOne({ name }, (err: Error | null, doc: Image | null) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    }
}

export const imageDb = new ImageDatabase();
