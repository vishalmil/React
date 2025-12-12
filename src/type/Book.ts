export interface Book {
    key: string;
    title: string;
    authors?: { name: string }[];
    author_name?: string[];
    cover_id?: number;
    cover_i?: number;
    image?: string;
};