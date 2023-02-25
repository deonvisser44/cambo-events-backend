import { DataSource } from 'typeorm';
import { typeormConfig } from './apps/api-server/src/config';

export const AppDataSource = new DataSource(typeormConfig());
