import { fetcher } from 'helpers/wrapper/fetch-wrapper-hook';
import useSWRInfinite from 'swr/infinite';
import useSWR from "swr";
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export function useTransactionPages({ limit = 5} = {}){
    const { data, error, size, ...props } = useSWRInfinite(
        (index, previosPageData) => {   
            if( previosPageData && previosPageData.transactions.length == 0) return null;

            const searchParams = new URLSearchParams();
            searchParams.set('limit', limit);

            if(index != 0 ){
                const before = new Date(
                    new Date(
                        previosPageData.transactions[previosPageData.transactions.length - 1].createdAt
                    ).getTime()
                );

                searchParams.set('before', before.toJSON());
            }
            return `/api/transactions?${searchParams.toString()}`;
        },
        fetcher,
        {
            refreshInterval: 10000,
            revalidateAll: false
        }
    );
    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size-1] === 'undefined');
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = 
        isEmpty || (data && data[data.length - 1]?.transactions?.length < limit);
    
    return{
        data,
        error,
        size,
        isLoadingMore,
        isReachingEnd,
        ...props
    };

} 


export function useAllTransactions(){
    const token = 'token';
    const { data, error, size, ...props } = useSWR(['/api/transactions', token]
        ,
        ([url, token]) => fetcher(url, token)
    );
    return {
        data,
        error,
        size,
        ...props
    };
}
