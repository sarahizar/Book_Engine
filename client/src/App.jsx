import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

// Create an ApolloClient instance
const client = new ApolloClient({
  uri: 'YOUR_GRAPHQL_SERVER_URI',
  cache: new InMemoryCache(),
});

function App() {
  return (
    // Wrap your application with ApolloProvider and pass the client instance
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;