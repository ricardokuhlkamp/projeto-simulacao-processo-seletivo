import { App } from './app';

const PORT = Number(process.env.PORT) || 3001;

new App().start(PORT);