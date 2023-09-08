import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
import db from '.';

class SequelizeAccount extends Model<
InferAttributes<SequelizeAccount>,
InferCreationAttributes<SequelizeAccount>
> {
    declare accountId: CreationOptional<number>;
    declare cpfCnpj: string;
    declare name: string;
    declare password: string;
    declare status: boolean;
}

SequelizeAccount.init({
    accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    cpfCnpj: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'accounts',
    timestamps: false,
    underscored: true,
})

export default SequelizeAccount;
