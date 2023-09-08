import { Sequelize } from 'sequelize';
import * as config from '../config/database';

const sequelize = new Sequelize(config)
// sequelize.sync({ force: false })
export default sequelize;