import { Request, Router, Response } from 'express';
import AccountAndTransactionController from '../controllers/AccountAndTransactionController';

const accountAndTransictionController = new AccountAndTransactionController();

const router = Router();

router.post(
    '/account',
    (req: Request, res: Response) => accountAndTransictionController.createAccount(req, res),
);

router.put(
    '/account/:id',
    (req: Request, res: Response) => accountAndTransictionController.updateAccount(req, res),
);

router.get(
    'account/:id',
    (req: Request, res: Response) => accountAndTransictionController.findAccount(req, res),
);

router.post(
    '/transaction',
    (req: Request, res: Response) => accountAndTransictionController.createTransaction(req, res),
);

router.get(
    '/transaction/:id',
    (req: Request, res: Response) => accountAndTransictionController.findAllTransactions(req, res),
);

router.put(
    '/cashback/:id',
    (req: Request, res: Response) => accountAndTransictionController.registerCashback(req, res),
);

export default router;