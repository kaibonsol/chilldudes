// Author: Kai Bonsol
// server/index.js
// main backend code, nodejs and expresst

/* Express Setup*/
const path = require('path')
const express = require("express")
const PORT = process.env.PORT || 3001
const app = express()

/* DotEnv */
require('dotenv').config()

/* Create PostgreSQL database client */
const Pool = require('pg').Pool

const isProduction = process.env.NODE_ENV === "production"

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`


const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {rejectUnauthorized: false} // comment out for development environment
})


/* Simple test */

pool.query(`INSERT INTO test(FirstName, LastName) VALUES($1,$2)`,
['FirstNameValue', 'LastNameValue'], (err, res) => {
    if (err) {
        console.log("Error - Failed to insert data into Users");
        console.log(err);
    }
})

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})