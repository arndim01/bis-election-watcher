import useSWR from "swr";
import { fetcher } from '@/helpers/wrapper/fetch-wrapper-hook';
import {fetchWrapper} from '@/helpers/wrapper/fetch-wrapper';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export function usePrecincts(){
    const { data , error } = useSWR(['/api/precinct/query/getbyparty/1'],
        fetcher,
        {
            refreshInterval: 5000 
        }
    );
    return { data, error};
}

export async function ApiGetPrecinct({token, id}){
    const { data, error} = await fetchWrapper.get(token, `${publicRuntimeConfig.apiUrl}/precinct/query/getbyid/${id}`);
    return { data, error};
}

export async function ApiGetPrecinctByParty({token, id}){
    const { data, error} = await fetchWrapper.get(token, `${publicRuntimeConfig.apiUrl}/precinct/query/getbyparty/${id}`);
    return { data, error};
}


export async function ApiUpdatePrecinct({token, id, formData}){
    const { data, error} = await fetchWrapper.post(token, `${publicRuntimeConfig.apiUrl}/precinct/update/byid/${id}`, formData);
    return { data, error};
}

export async function ApiDeletePrecinct({token, id}){
    const {data, error} = await fetchWrapper.delete(token, `${publicRuntimeConfig.apiUrl}/precinct/delete/${id}`);
    return {data, error};
}

export async function ApiCreatePrecinct({token, formData}){
    const { data, error } = await fetchWrapper.post(token, `${publicRuntimeConfig.apiUrl}/precinct/create`, formData);
    return { data, error};
}