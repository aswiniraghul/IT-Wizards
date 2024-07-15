import axios from 'axios';
import { useEffect } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

const App = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    //Fetch all items on initial startup
    fetchItemData()
      .then(setItems)
      .catch((error) => {
        console.error('There weas an error fetching the items.', error);
      });
  }, []);

  const fetchItemData = async () => {
    const response = await axios.get('http://localhost:8080/items');
    return response.data;
  };

  // function getItemDatabase({ blank }) {
  //   const [serverUrl, setServerUrl] = useState('https://localhost:8080');

  //   useEffect(() => {
  //     const connection = createConnection(serverUrl, blank);
  //     connection.connect();
  //     return () => {
  //       connection.disconnect();
  //     };
  //   }, [setServerUrl, blank]);
  // };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
