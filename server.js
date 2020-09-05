const express = require('express');

const connectDB = require('./config/db');
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({extended: false}));

app.use('/api/register', require('./routes/register'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen( PORT, () => console.log(`Server started on port ${PORT}`));
