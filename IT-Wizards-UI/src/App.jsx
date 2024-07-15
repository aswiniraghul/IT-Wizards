import axios from 'axios';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

const App = () => {

  // const [items, setItems] = useState();

  // const fetchItemData = async (
  //   const response = await axios.get<>("localhost:8080/items")
  // )
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
