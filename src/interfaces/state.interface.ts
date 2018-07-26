import { QueryInterface } from './query.interface';
import { NewsInterface } from '@/interfaces/news.interface';

export interface StateInterface {
    apiUrl: string;
    news: NewsInterface[];
    query: any;
}
