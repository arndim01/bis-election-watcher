import useSWRInfinite from 'swr/infinite';
import useSWR from "swr";
import { fetcher } from '@/helpers/wrapper/fetch-wrapper-hook';

export function useWatchers(){
    const { data , error } = useSWR(['/api/watcher/query/getbyparty/1'],
        fetcher,
        {
            refreshInterval: 5000 
        }
    );
    return { data, error};
}