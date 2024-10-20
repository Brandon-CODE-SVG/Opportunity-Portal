const express = require('express'); //Import Express 

const mysql = require('mysql2'); //import mySQL
const  bodyParser = require('body-parser'); // to handle all the JSON data 
const cors = require('cors'); // to handle cross origin request/ to handle all the Cors issues 

//Create an instance of express 
const app = express();

//middleware setup
app.use(cors()); //Enable cors to allow request from different origins
app.use(bodyParser.json()); //parse incoming json request


//setup MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bgichigi@!47',
    database: 'opportunity_portal'
});

//connect to the mysql database 
db.connect((err) => {
    if(err) throw err; // if there is an error throw it to stop excution
    console.log('Mysql Connected to MySQL database'); // log success message upon succesful connectiom

});

// define API endpoints ()

//start the express server 
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000'); //log message to indicate server is running 
});

// get all the job listings
app.get('/jobs-listings', (req,res) => {
    //excutes a SQL query to select all the records from the job listings table 
    db.query('SELECT * FROM Job_listings', (err, results) =>{
        //if theres an error excuting the query, send a 500 internal Server Error responces
        if(err) return res.status(500).json(err);
        //if th equer is succesful, send the results as JSON response 
        res.json(results);
    });
});

// Add a job listing
app.post('/job-listings', (req, res) => {
    // Destructure the job listing data from the request body
    const { title, description, employer_id } = req.body;
    
    // Execute a SQL query to insert a new job listing into the Job_Listings table
    db.query(
        'INSERT INTO Job_Listings (title, description, employer_id) VALUES (?, ?, ?)', 
        [title, description, employer_id], // Use parameterized queries to prevent SQL injection
        (err, results) => {
            // If there's an error executing the insert query, send a 500 Internal Server Error response
            if (err) return res.status(500).json(err);
            
            // If the insertion is successful, send the new job listing's ID as a JSON response
            res.json({ id: results.insertId });
        }
    );
});