import { Model, QueryInterface, DataTypes } from 'sequelize';

import { IAccount } from '../../interfaces/IAccounts';

export default {
    up(queryInterface: QueryInterface) {
        return queryInterface.createTable<Model<IAccount>>
        ('accounts', {
            accountId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                field: 'account_id',
            },
            cpfCnpj: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'cpf_cpnj'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name',
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password',
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                field: 'status',
            },
        });
    },
    down(queryInterface: QueryInterface) {
        return queryInterface.dropTable('accounts');
    },
};
