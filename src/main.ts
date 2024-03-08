import { Application } from '@src/Application';

const application = new Application();
application.init().catch((err) => console.error(err));
