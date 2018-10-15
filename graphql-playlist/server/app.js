const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin request
app.use(cors());

// connect to mlab database
mongoose.connect('mongodb://admin:admin123@ds131983.mlab.com:31983/gql-ninja');
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

// bind express with graphql
app.use('/graphiql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
