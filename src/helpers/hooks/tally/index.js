import useSWRInfinite from 'swr/infinite';
import useSWR from "swr";
import { fetcher, fetcherPost } from '@/helpers/wrapper/fetch-wrapper-hook';
import getConfig from 'next/config';
import {fetchWrapper} from '@/helpers/wrapper/fetch-wrapper';
const { publicRuntimeConfig } = getConfig();

export function useTally({ precinct }){
    const { data, error } = useSWR([`${publicRuntimeConfig.apiUrl}/precinct/query/generatetally/${precinct}`],
        fetcher,
        {
            refreshInterval: 1000
        }
    );
    return {data, error};
}

export function useTallyVote({ formData }){
    const { data, error } = useSWR({ url: `${publicRuntimeConfig.apiUrl}/tally/generatevotes`, formData: formData },
        fetcherPost,
        {
            refreshInterval: 30000
        }
    );
    return {data, error};
}

export async function ApiGetTally({ token, precinct }){
    const { data, error } = await fetchWrapper.get(token, `${publicRuntimeConfig.apiUrl}/precinct/query/generatetally/${precinct}`);
    return {data, error};
}

export async function ApiPostCount({ token, formData }){
    const { data, error } = await fetchWrapper.post(token, `${publicRuntimeConfig.apiUrl}/count/candidate`, formData);
    return {data, error};
}