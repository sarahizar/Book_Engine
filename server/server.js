const express = require('express');
const { ApolloServer } = require('@apollo/server');

const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } 

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();




// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const routes = require('./routes');
// const path = require('path'); 

// const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Apollo Server setup
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// // Start the Apollo Server instance
// async function startServer() {
//   await server.start();
//   server.applyMiddleware({ app });

//   // Define routes
//   app.use(routes);

//   // Serve static assets in production
//   if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
//   }

//   // Connect to database and start server
//   db.once('open', () => {
//     app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
//   });
// }

// startServer().catch(err => console.error(err));