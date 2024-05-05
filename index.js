require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const queryRouter = require('./api/query');  // Ensure this is exporting an Express router

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', queryRouter);  // Changed to use '/api' as base path for the router

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file when accessing the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all for 404 Not Found responses
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
