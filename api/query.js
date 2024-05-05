const express = require('express');
const app = express();

// Example middleware with added logging
app.use((req, res, next) => {
    console.log('Middleware 1 called');
    next();
});

app.use(express.json());

app.post('/', async (req, res, next) => {
    console.log('Post route called');
    try {
        // Your route logic here
        console.log('Handling POST request for:', req.body);
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error handling POST route:', error);
        next(error); // Properly pass errors to Express
    }
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'An unexpected error occurred' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
