import { QueryInterface } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkInsert(
            'accounts',
            [
                {
                    accountId: 1,
                    cpfCnpj: '01234567890',
                    name: 'Fulano',
                    password: '1234',
                    status: true,
                },
                {
                    accountId: 2,
                    cpfCnpj: '11234567806',
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
