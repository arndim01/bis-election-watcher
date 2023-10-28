import {fetchWrapper} from '@/helpers/wrapper/fetch-wrapper';

export default async function validateApiToken({token}){
    const response  = await fetchWrapper.get(token, `http://localhost:3000/api/checktoken`);
    return response;
}
