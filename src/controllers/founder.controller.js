
const { Pool } = require('pg');
const pool = require('../config/dataBaseConnection');

const addFounder = async (event) => {
    try {
        const client = await pool.connect();
        const companyId = event.pathParameters.companyId;
        const { fullName, title } = JSON.parse(event.body);
        const existingFounderQuery = 'SELECT * FROM founders WHERE full_name = $1';
        const existingFounderValues = [fullName];
        const existingFounderResult = await client.query(existingFounderQuery, existingFounderValues);
        if (existingFounderResult.rows.length > 0) {
            client.release();
            return {
                statusCode: 400,
                body: JSON.stringify({ resMessage: 'Founder is already associated with another company' }),
            };
        }

        const query = 'INSERT INTO founders (company_id, full_name, title) VALUES ($1, $2, $3) RETURNING *';
        const values = [companyId, fullName, title];
        const result = await client.query(query, values);
        client.release();
        return {
            statusCode: 201,
            body: JSON.stringify({
                resMessage: "Founder created successfully!!",
                data: result.rows[0]
            })
        };
    } catch (error) {
        // If an error occurs, respond with an error message
        return {
            statusCode: 500,
            body: JSON.stringify({ resMessage: 'Internal Server Error' })
        };
    }

};

module.exports = {
    addFounder
};
