const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next ) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

/*app.use((req, res, next) => {
  res.render('maintenance.hbs');
}); */

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Welcome Page',
    //currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my website'
//  res.send('<h1>Hello Express!</h1>');
/*res.send({
  name: 'Anthony',
  likes: [
    'Biking',
    'Music'
  ] */
})
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    //currentYear: new Date().getFullYear()
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    //currentYear: new Date().getFullYear()
  });
});

// /bad - send back json data with errorMessage property
app.get('/bad', (req, res) => {
//  res.send('<h1>Hello Express!</h1>');
res.send({
  errorMessage: 'Unable to find page!'
})
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
