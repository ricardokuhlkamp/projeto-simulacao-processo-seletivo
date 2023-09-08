import { Router } from 'express';
import router from './routes';

const finalRouter = Router();

finalRouter.use('/novobanco', router);

export default finalRouter;