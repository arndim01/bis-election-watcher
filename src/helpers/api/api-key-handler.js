import nc from 'next-connect';
import auth from './auth';
import { errorHandler } from './error-handler';

const apiKeyHandler = nc(errorHandler);
apiKeyHandler.use(auth);

export default apiKeyHandler;