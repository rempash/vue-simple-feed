import { QueryInterface } from '@/interfaces/query.interface';
import { PostInterface } from '@/interfaces/post.interface';
import { StepInterface } from '@/interfaces/step.interface';

export interface StateInterface {
    apiUrl: string;
    posts: PostInterface[];
    postsHash: {
        [index: number]: number
    }
    step: StepInterface;
    query: QueryInterface;
    [index: string]: any;
}
