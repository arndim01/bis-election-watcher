import { UnauthorizedError } from "express-jwt";
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export default async function auth(req, res, next){

    let key = req.headers['x-api-key'];
    if( key !== serverRuntimeConfig.apikey){
       throw UnauthorizedError;
    }
    next();
}