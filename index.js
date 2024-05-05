require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Add this to handle file paths
const queryRouter = require('./api/query');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/query', queryRouter);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the index.html file when accessing the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
