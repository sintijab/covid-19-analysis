const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const path = require('path');

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.start();

server.applyMiddleware({ app });

app.use(express.static(__dirname + '/build'));

const serverPort = process.env.PORT || 4000;
const serverHost = '0.0.0.0'

app.get('*', ((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
}));

app.listen(serverPort, serverHost, () => {
  console.log('Listening on port %d', serverPort)
});