import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
import db from '.';
import SequelizeAccount from './SequelizeAccount';

class SequelizeTransaction extends Model<
InferAttributes<SequelizeTransaction>,
InferCreationAttributes<SequelizeTransaction>
> {
    declare transactionId: CreationOptional<number>;
    declare originAccountId: number;
    declare destinationAccountId: number;
    declare value: number;
    declare date: Date;
    declare cashback: CreationOptional<number>;
}

SequelizeTransaction.init({
    transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    originAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    destinationAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cashback: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: db,
    modelName: 'transactions',
    timestamps: false,
    underscored: true,
});

SequelizeTransaction.belongsTo(SequelizeAccount, {
    foreignKey: 'originAccountId',
    as: 'originAccount',
});
  
SequelizeTransaction.belongsTo(SequelizeAccount, {
    foreignKey: 'destinationAccountId',
    as: 'destinationAccount',
});

export default SequelizeTransaction;