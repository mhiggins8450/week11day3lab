// Require the Express module
const express = require('express');

// Create an Express application
const app = express();

// Define a route for '/greeting' that can optionally take a 'name' parameter
app.get('/greeting/:name?', (req, res) => {
    const name = req.params.name;
    if (name) {
        // If a name is provided, use it in the greeting
        res.send(`Wow! Hello there, ${name}`);
    } else {
        // If no name is provided, use a generic greeting
        res.send('Hello, stranger');
    }
});

// New '/tip' route
app.get('/tip/:total/:tipPercentage', (req, res) => {
    const total = parseFloat(req.params.total);
    const tipPercentage = parseFloat(req.params.tipPercentage);

    if (!isNaN(total) && !isNaN(tipPercentage)) {
        // Calculate the tip amount
        const tipAmount = (total * tipPercentage) / 100;

        // Send the calculated tip amount as a response
        res.send(`${tipAmount}`);
    } else {
        // Send an error message if the input is not a number
        res.send('Please provide valid numbers for total and tip percentage.');
    }
});

// Magic 8 Ball responses array
const magic8Responses = [
    "It is certain", "It is decidedly so", "Without a doubt", "Yes definitely",
    "You may rely on it", "As I see it yes", "Most likely", "Outlook good",
    "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later",
    "Better not tell you now", "Cannot predict now", "Concentrate and ask again",
    "Don't count on it", "My reply is no", "My sources say no",
    "Outlook not so good", "Very doubtful"
];

// '/magic' route
app.get('/magic/:question', (req, res) => {
    const question = req.params.question.replace(/%20/g, ' ');
    const randomIndex = Math.floor(Math.random() * magic8Responses.length);
    const magic8Answer = magic8Responses[randomIndex];

    // Send the question and a random Magic 8 Ball response
    res.send(`<h1>${question}? ${magic8Answer}</h1>`);
});

// Tell the server where to listen for requests
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});