const path = require('path');
const express = require('express');
const { name } = require('ejs');
const app = express();

//View setup
app.set('view engine', 'ejs');
app.set('views', 'C:/Users/tshor/Documents/MyProjects/Code/MTG_Proxy_Creator/mtg-proxy-creator-repo/views');


//app configurations
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('main_display');
})

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});