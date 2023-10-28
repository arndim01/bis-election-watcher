import { customAlphabet  } from 'nanoid';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();


export default async function handler(){
    const nanoid = customAlphabet('1234567890abcdefghigklmnopqrstuvwxyz', 20);
    return nanoid();
}