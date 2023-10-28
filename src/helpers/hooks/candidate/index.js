import useSWR from "swr";
import { fetcher } from '@/helpers/wrapper/fetch-wrapper-hook';
import {fetchWrapper} from '@/helpers/wrapper/fetch-wrapper';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export function useCandidates(){
    const { data , error } = useSWR(['/api/candidate/query/getbyparty/1'],
        fetcher,
        {
            refreshInterval: 5000 
        }
    );
    return { data, error};
}

export async function ApiGetCandidate({token, id}){
    const { data, error} = await fetchWrapper.get(token, `${publicRuntimeConfig.apiUrl}/candidate/query/getbyid/${id}`);
    return { data, error};
}

export async function ApiUpdateCandidate({token, id, formData}){
    const { data, error} = await fetchWrapper.upload(token, `${publicRuntimeConfig.apiUrl}/candidate/update/byid/${id}`, formData);
    return { data, error};
}

export async function ApiDeleteCandidate({token, id}){
    const {data, error} = await fetchWrapper.delete(token, `${publicRuntimeConfig.apiUrl}/candidate/delete/${id}`);
    return {data, error};
}

export async function ApiCreateCandidate({token, formData}){
    const { data, error } = await fetchWrapper.upload(token, `${publicRuntimeConfig.apiUrl}/candidate/create`, formData);
    return { data, error};
}