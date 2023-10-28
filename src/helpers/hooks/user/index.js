import useSWRInfinite from 'swr/infinite';
import useSWR from "swr";
import { fetcher } from '@/helpers/wrapper/fetch-wrapper-hook';
import getConfig from 'next/config';
import {fetchWrapper} from '@/helpers/wrapper/fetch-wrapper';
const { publicRuntimeConfig } = getConfig();

export async function ApiGetUserInfo({token, username  }){
    const { data, error} = await fetchWrapper.get(token, `${publicRuntimeConfig.apiUrl}/user/query/getuserdetail/${username}`);
    return { data, error};
}

export async function ApiUpdateUserInfo({ token, username, formData}){
    const { data, error} = await fetchWrapper.put(token, `${publicRuntimeConfig.apiUrl}/user/update/userdetail/${username}`, formData);
    return {data, error};
}

export async function ApiUpdatePassword({ token, username, formData}){
    const { data, error} = await fetchWrapper.post(token, `${publicRuntimeConfig.apiUrl}/user/update/changepassword/${username}`, formData);
    return {data, error};
}