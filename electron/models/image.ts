export interface Image {
    name: string;
    like: ImageStatus;
}

export enum ImageStatus {
    LIKE = 'l',
    DISLIKE = 'd',
    NONE = 'n',
}