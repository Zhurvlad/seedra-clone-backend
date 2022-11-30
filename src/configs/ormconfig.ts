


const config = {
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  logging: process.env.DATABASE_LOGGING,
  migrationsRun: process.env.DATABASE_MIGRATIONS_RUN,
  acquireTimeout: process.env.DATABASE_TIMEOUT,
  synchronize: process.env.DATABASE_SYNCHRONIZE,
  entities: [
    [__dirname + '/**/*.entity{.ts,.js}']
  ],
  migrations: [
    '/migrations/**/*{.ts,.js}',
  ],
  cli: {
   /* entitiesDir: 'src/entities',*/
    migrationsDir: 'src/migrations',
  },
};

  Object.assign(config, {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    acquireTimeout: process.env.DB_TIMEOUT,
    rejectUnauthorized: true,
  });

module.exports = config;