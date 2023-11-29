import pg from 'pg';

// С помощью Pool пишутся SQL-запросы к БД
const pool = new pg.Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: "nodejs_postgres"
});

export default pool;
