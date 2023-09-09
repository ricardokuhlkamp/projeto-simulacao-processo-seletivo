import { QueryInterface } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkInsert(
            'accounts',
            [
                {
                    account_id: 1,
                    cpf_cnpj: '01234567890',
                    name: 'Fulano',
                    password: '1234',
                    status: true,
                },
                {
                    account_id: 2,
                    cpf_cnpj: '11234567806',
                    name: 'Ciclano',
                    password: '4321',
                    status: true,
                }
            ]
        )
    },
    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete('accounts', {});
    },
};
