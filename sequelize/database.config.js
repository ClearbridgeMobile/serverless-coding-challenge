const envFile = process.env.NODE_ENV;

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `${process.cwd()}/env/.env${
    process.env.NODE_ENV !== 'docker' ? '' : '.' + envFile
  }`,
});

process.env.TZ = 'UTC';
const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_SCHEMA,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env;

module.exports = {
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  schema: POSTGRES_SCHEMA,
  dialect: 'postgres',
};
