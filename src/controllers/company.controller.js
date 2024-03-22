const pool = require('../config/dataBaseConnection');

const createCompany = async (event) => {
    try {
        // Parse the request body
        const { name, city, state, description, founded_date } = JSON.parse(event.body);

        // Create a new company in the database
        const client = await pool.connect();
        const query = 'INSERT INTO companies (name, city, state, description, founded_date) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [name, city, state, description, founded_date];
        const result = await client.query(query, values);
        client.release();

        // Respond with success message and created company data
        return {
            statusCode: 201,
            body: JSON.stringify({
                resMessage: "Company created successfully!!",
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

const updateCompany = async (event) => {
    try {
        // Parse the request body
        const companyId = event.pathParameters.companyId;
        const { name, city, state, description, founded_date } = JSON.parse(event.body);

        // Update the company details in the database
        const client = await pool.connect();
        const query = 'UPDATE companies SET name = $1, city = $2, state = $3, description = $4, founded_date = $5 WHERE id = $6 RETURNING *';
        const values = [name, city, state, description, founded_date, companyId];
        const result = await client.query(query, values);
        client.release();

        // Check if the company was found and updated
        if (result.rows.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ resMessage: 'Company not found' }),
            };
        }

        // Respond with success message and updated company data
        return {
            statusCode: 200,
            body: JSON.stringify({
                resMessage: "Company updated successfully!!",
                data: result.rows[0]
            })
        };
    } catch (error) {
        console.log(error)
        // If an error occurs, respond with an error message
        return {
            statusCode: 500,
            body: JSON.stringify({ resMessage: 'Internal Server Error' })
        };
    }
};

const listCompanies = async () => {
    try {
        // Fetch all companies from the database
        const client = await pool.connect();
        const query = 'SELECT * FROM companies';
        const result = await client.query(query);
        client.release();

        // Respond with success message and company data
        return {
            statusCode: 200,
            body: JSON.stringify({
                data: result.rows,
                totalCount: result.rowCount
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

const getCompany = async (event) => {
    try {
        // Get the company ID from the path parameters
        const companyId = event.pathParameters.companyId;

        // Fetch the company details and associated founders from the database
        const client = await pool.connect();
        const query = `SELECT c.*, f.full_name AS founder_name, f.title AS founder_title FROM companies c LEFT JOIN founders f ON c.id = f.company_id WHERE c.id = $1`;
        const values = [companyId];
        const result = await client.query(query, values);
        client.release();

        // Check if the company exists
        if (result.rows.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ resMessage: 'Company not found' }),
            };
        }

        // Format the response data
        const companyData = {
            id: result.rows[0].id,
            name: result.rows[0].name,
            city: result.rows[0].city,
            state: result.rows[0].state,
            description: result.rows[0].description,
            founded_date: result.rows[0].founded_date,
            founders: result.rows.map(row => {
                let obj = {}
                if(row.founder_name){
                    obj.fullName = row.founder_name
                }
                if(row.founder_title){
                    obj.title = row.founder_title
                }
                return obj
            })
        };
        // Respond with success message and company data
        return {
            statusCode: 200,
            body: JSON.stringify({
                data: companyData
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


const deleteCompany = async (event) => {
    try {
        // Get the company ID from the path parameters
        const companyId = event.pathParameters.companyId;

        // Delete the company from the database
        const client = await pool.connect();
        const query = 'DELETE FROM companies WHERE id = $1';
        const values = [companyId];
        await client.query(query, values);
        client.release();

        // Respond with success message
        return {
            statusCode: 204,
            body: JSON.stringify({
                resMessage: "Company deleted successfully!!"
            })
        };
    } catch (error) {
        // If an error occurs, respond with an error message
        return {
            statusCode: 500,
            body: JSON.stringify({ resMessage: 'Internal Server Error' })
        };
    }
}
module.exports = {
    createCompany,
    updateCompany,
    listCompanies,
    getCompany,
    deleteCompany
}