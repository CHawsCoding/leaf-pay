const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Set the directory where the view templates are located
app.set('views', 'src/views');


app.use(express.static('public'));

mongoose.connect('mongodb://localhost/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(cors());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    res.render('pages/landing', {
        title: 'Welcome'
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Open http://localhost:${PORT} in your browser.`);
  });