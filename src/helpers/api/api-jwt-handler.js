import { errorHandler } from "./error-handler";
import nc from 'next-connect';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { expressjwt: jwt } = require('express-jwt');
const apiJwtHandler = nc(errorHandler);
apiJwtHandler.use(
    jwt( { secret: serverRuntimeConfig.secret, algorithms: ['HS256']} ).unless({
        path: [
            '/api/authenticate',
            '/api/file/upload',
        ]
    })
);

export default apiJwtHandler;