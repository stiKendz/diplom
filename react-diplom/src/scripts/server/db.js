import express from 'express';
import pg from 'pg';


const { Pool } = pg;

const adminPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '12345',
    port: 5432,
})

export default adminPool;