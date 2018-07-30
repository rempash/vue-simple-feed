import { QueryInterface } from './query.interface';
import { NewsInterface } from '@/interfaces/news.interface';

export interface StateInterface {
    apiUrl: string;
    news: NewsInterface[];
    query: QueryInterface;
    comments: {
        [index: string]: any
    }
    [index: string]: any;
}
