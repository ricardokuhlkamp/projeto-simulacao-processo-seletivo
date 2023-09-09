import { QueryInterface } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.bulkInsert(
            'transactions',
            [
                {
                    transaction_id: 1,
                    origin_account_id: 1,
                    destination_account_id: 2,
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
