export interface Image {
    name: string;
    like: boolean;
}

export enum ImageStatus {
    LIKE = 'like',
    DISLIKE = 'dislike',
    NONE = 'none',
}