import { NextFunction, Request, Response } from 'express';

class ValidateCpfCnpj {
    static validateUserCpfOrCnpj(req: Request, res: Response, next: NextFunction): Response | void {
        const { cpfCnpj } = req.body;
        const response: string = ValidateCpfCnpj.validadorCPForCNPJ(cpfCnpj);
        if (response === 'invalid') {
            return res.status(400).json({ message: 'Invalid document.' });
        }
        next();
    }

    static validadorCPForCNPJ(cpfCpnj: string): string {
        const document: string = cpfCpnj.replace(/[^\d]/g, '');
        const factor1cpf = [10, 9, 8, 7, 6, 5, 4, 3, 2];
        const factor2cpf = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        const factor1cnpj = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const factor2cnpj = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        if (document.length === 11) {
            return this.validarCPF(document, factor1cpf, factor2cpf)
        } else if (document.length === 14) {
            return this.validarCPF(document, factor1cnpj, factor2cnpj)
        } else {
            return 'invalid'
        }
    }

    static validarCPF(cpf: string, factor1: number[], factor2: number[]) {
        const arr = cpf.split('');
        const stringToNumber = arr.map((c) => +c);
        const lastTwoDigits = stringToNumber.splice(-2);
        const arr1 = stringToNumber;    
        const firstDigit = this.digit(arr1, factor1);
        const arr2 = [...arr1, firstDigit];
        const secondDigit = this.digit(arr2, factor2);
        return firstDigit === lastTwoDigits[0] 
            && secondDigit === lastTwoDigits[1] ? 'valid' : 'invalid';
    }
    
    static digit(arr: number[], factor: number[]): number {    
        const sum = arr.reduce((acc, digit, index) => {
            return acc + digit * factor[index];
        }, 0);
        const pDigito = (sum % 11) < 2 ? 0 : 11 - (sum % 11);
        return pDigito;
    }
}

export default ValidateCpfCnpj;