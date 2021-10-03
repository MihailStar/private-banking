import { isDevelopment } from './gulp/configuration';
import development from './gulp/tasks/development';
import production from './gulp/tasks/production';

export default isDevelopment ? development : production;
