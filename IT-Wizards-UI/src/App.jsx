import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import AddItemForm from './components/AddItemForm';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage';
import { getItems } from './services/itemsService';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  // useEffect(() => {
  //   //Fetch all items on initial startup
  //   fetchItemData()
  //     .then(setItems)
  //     .catch((error) => {
  //       console.error('There weas an error fetching the items.', error);
  //     });
  // }, []);

  // const fetchItemData = async () => {
  //   const response = await axios.get('http://localhost:8080/items');
  //   return response.data;
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetch('http://localhost:8080/items');
  //     const jsonResult = await result.json();

  //     setItems(jsonResult);
  //   };

  //   fetchData();
  // }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/items" element={<ItemsPage items={items} />} />
        <Route path="/addItems" element={<AddItemForm />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
