import { QueryInterface } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkInsert(
            'transactions',
            [
                {
                    transictionId: 1,
                    originAccountId: 1,
                    destinationAccountId: 2,
                    value: 10.00,
                    date: new Date(),
                },
            ]
        )
    },
    down: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkDelete('transactions', {});
    },
};
