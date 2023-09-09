import { Request, Router, Response } from 'express';
import AccountAndTransactionController from '../controllers/AccountAndTransactionController';
import ValidateCpfCnpj from '../middlewares/ValidateCpfCnpj';

const accountAndTransactionController = new AccountAndTransactionController();

const router = Router();

router.post(
    '/account',
    ValidateCpfCnpj.validateUserCpfOrCnpj,
    (req: Request, res: Response) => accountAndTransactionController.createAccount(req, res),
);

router.put(
    '/account/:id',
    (req: Request, res: Response) => accountAndTransactionController.updateAccount(req, res),
);

router.get(
    '/account/:id',
    (req: Request, res: Response) => accountAndTransactionController.findAccount(req, res),
);

router.put(
    '/transaction/:id/cashback',
    (req: Request, res: Response) => accountAndTransactionController.registerCashback(req, res),
);
router.post(
    '/transaction/:id',
    (req: Request, res: Response) => accountAndTransactionController.createTransaction(req, res),
);

router.get(
    '/transaction/:id',
    (req: Request, res: Response) => accountAndTransactionController.findAllTransactions(req, res),
);


export default router;