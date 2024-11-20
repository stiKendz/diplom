import express from 'express';
import pg from 'pg';


const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    database: 'cardb',
    password: '12345',
    host: 'localhost',
    port: 5432
});

export default db;
