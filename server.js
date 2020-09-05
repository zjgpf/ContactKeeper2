const express = require('express');
const path = require('path');

const connectDB = require('./config/db');
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({extended: false}));

app.use('/api/register', require('./routes/register'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen( PORT, () => console.log(`Server started on port ${PORT}`));
