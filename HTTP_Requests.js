const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'collegecommerce.database.windows.net',
  user: 'speter61@kent.edu',
  database: 'CollegeCommerce',
});

// Your existing listings endpoint
app.get('/api/listings', (req, res) => {
  connection.query('SELECT * FROM Listings', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

// New endpoint for adding a listing
app.post('/api/listings', (req, res) => {
  const { Listings_ID, Seller_ID, Description, Price, Location_ID, Transaction_Date, Buyer_ID, Title, Photo_Urls, Date_Posted } = req.body;

  const sqlInsert = `
    INSERT INTO Listings (Seller_ID, Description, Price, Location_ID, Transaction_Date, Buyer_ID)
    VALUES (?, ?, ?, POINT(?, ?), ?, ?);
  `;

  connection.query(
    sqlInsert,
    [Listings_ID, Seller_ID, Description, Price, Location_ID[0], Location_ID[1], Transaction_Date, Buyer_ID, Title, Photo_Urls, Date_Posted],
    (err, results) => {
      if (err) {
        console.error('Error inserting listing:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.status(201).json({ message: 'Listing added successfully', listingId: results.insertId });
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
