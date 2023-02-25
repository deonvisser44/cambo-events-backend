// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { registerAs } from '@nestjs/config';
import { User } from '../modules/user/entities/user.entity';
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { Event } from '../modules/event/entities/event.entity';
import { SavedEvent } from '../modules/event/entities/saved-event.entity';

export const typeormConfig = registerAs(
  'typeorm',
  (): DataSourceOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User, Event, SavedEvent],
    migrations: [join(__dirname, '../../migrations/**/*.{ts,js}')],
  }),
);
