import { Model, QueryInterface, DataTypes } from 'sequelize';
import { ITransaction } from '../../interfaces/ITransaction';

export default {
    // eslint-disable-next-line max-lines-per-function
    up(queryInterface: QueryInterface) {
        return queryInterface.createTable<Model<ITransaction>>('transactions', {
            transactionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                field: 'transaction_id'
            },
            originAccountId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'origin_account_id'
            },
            destinationAccountId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'destination_account_id'
            },
            value: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'value',
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'date',
            },
            cashback: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'cashback',
            }
        });
    },
    down(queryInterface: QueryInterface) {
        return queryInterface.dropTable('transactions');
    },
};
