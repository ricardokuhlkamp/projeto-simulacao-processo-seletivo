import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
import db from '.';
import SequelizeAccount from './SequelizeAccount';

class SequelizeTransiction extends Model<
InferAttributes<SequelizeTransiction>,
InferCreationAttributes<SequelizeTransiction>
> {
    declare transictionId: CreationOptional<number>;
    declare originAccountId: number;
    declare destinationAccountId: number;
    declare value: number;
    declare date: Date;
    declare cashback: CreationOptional<number>;
}

SequelizeTransiction.init({
    transictionId: {
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
    modelName: 'transictions',
    timestamps: false,
    underscored: true,
});

SequelizeTransiction.belongsTo(SequelizeAccount, {
    foreignKey: 'originAccountId',
    as: 'originAccount',
});
  
SequelizeTransiction.belongsTo(SequelizeAccount, {
    foreignKey: 'destinationAccountId',
    as: 'destinationAccount',
});

export default SequelizeTransiction;