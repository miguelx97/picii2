export interface Image {
    name: string;
    like: ImageStatus;
}

export enum ImageStatus {
    LIKE = 'l',
    DISLIKE = 'd',
    NONE = 'n',
}

export const getImagePath = (path: string, image: string) => {
    return `file:///${path.replace(/\\/g, "/")}/${image}`;
};