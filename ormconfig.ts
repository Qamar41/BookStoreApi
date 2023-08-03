import './src/boilerplate.polyfill';

import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { UserSubscriber } from './src/entity-subscribers/user-subscriber';
import { SnakeNamingStrategy } from './src/snake-naming.strategy';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [UserSubscriber],
  entities: [
    'src/modules/**/*.entity{.ts,.js}',
    'src/modules/**/*.view-entity{.ts,.js}',
  ],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});
