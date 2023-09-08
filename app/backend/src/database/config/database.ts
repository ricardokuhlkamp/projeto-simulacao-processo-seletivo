import { Options } from 'sequelize';
import 'dotenv/config';

const config: Options = {
  username: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || 'root',
  database: process.env.MYSQLDATABASE || 'bancodb',
  host: process.env.MYSQLHOST || 'db',
  port: Number(process.env.MYSQLPORT) || 3306,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: true,
  ssl: true,
};

export = config;