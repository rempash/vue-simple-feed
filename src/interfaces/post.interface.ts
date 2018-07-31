import { CommentsInterface } from '@/interfaces/comments.interface';
export interface PostInterface {
    body: string;
    id: number;
    title: string;
    userId: number;
    rating: number;
    comments: CommentsInterface[];
}
