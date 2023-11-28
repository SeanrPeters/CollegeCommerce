const sql = require('mssql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 1433;

app.use(bodyParser.json());

const config = {
    user: 'CloudSA3e3257f5@CollegeCommerce',
    password: 'capstone23!',
    server: 'collegecommerce.database.windows.net',
    port: 1433,
    database: 'CollegeCommerce',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
  let poolConnection;
  try {
      poolConnection = await sql.connect(config);

      console.log("Reading rows from the Table...");
      const resultSet = await poolConnection.request().query('SELECT * FROM Listings');

      console.log(`${resultSet.recordset.length} rows returned.`);

      // output column headers
      const columns = Object.keys(resultSet.recordset.columns).join(', ');
      console.log(columns);

      // output row contents from default record set
      resultSet.recordset.forEach(row => {
          const values = Object.values(row).join(', ');
          console.log(values);
      });
  } catch (err) {
      console.error(err.message);
  } finally {
      if (poolConnection) {
          poolConnection.close();
      }
  }
}


app.get('/api/listings', async (req, res) => {
    try {
        const poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query('SELECT * FROM Listings');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/listings', async (req, res) => {
    const { Seller_ID, Description, Price, Location_ID, Transaction_Date, Buyer_ID, Title, Photo_Urls, Date_Posted, URL } = req.body;

    const sqlInsert = `
        INSERT INTO Listings (Seller_ID, Description, Price, Location_ID, Transaction_Date, Buyer_ID, Title, Photo_Urls, Date_Posted, URL)
        VALUES (?, ?, ?, POINT(?, ?), ?, ?, ?, ?, ?, ?);
    `;

    try {
        const poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
            .input('Seller_ID', Seller_ID)
            .input('Description', Description)
            .input('Price', Price)
            .input('Location_ID[0]', Location_ID[0])
            .input('Location_ID[1]', Location_ID[1])
            .input('Transaction_Date', Transaction_Date)
            .input('Buyer_ID', Buyer_ID)
            .input('Title', Title)
            .input('Photo_Urls', Photo_Urls)
            .input('Date_Posted', Date_Posted)
            .input('URL', URL)
            .query(sqlInsert);

        res.status(201).json({ message: 'Listing added successfully', listingId: result.insertId });
    } catch (err) {
        console.error('Error inserting listing:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
