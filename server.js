const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const path = require('path');

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app });

  app.use(express.static(__dirname + '/build'))

  app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/index.html'));
  });
  const serverPort = process.env.PORT || 4000
  const serverHost = '0.0.0.0'
  app.listen(serverPort, serverHost, () => {
    console.log('Listening on port %d', serverPort)
  })
}

startApolloServer();