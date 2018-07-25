import { NewsInterface } from '@/interfaces/news.interface';
import { QueryInterface } from '@/interfaces/query.interface';

export interface StateInterface {
    apiUrl: string;
    news: NewsInterface[];
    query: any;
}
