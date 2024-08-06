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
import EditItemForm from './components/EditItemForm';
import ItemCategoriesPage from './pages/ItemCategoriesPage';
import EditItemCategoriesForm from './components/EditItemCategoriesForm';
import AddItemCategoryForm from './components/AddItemCategoryForm';
import ItemDetailsPage from './pages/ItemDetailsPage';
import CartProvider from './components/CartContext';
import EditProfile from './components/profile/EditProfile';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import SearchResultsPage from './pages/SearchResultsPage';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/addItems" element={<AddItemForm />} />
        <Route path="/items/editItem/:id" element={<EditItemForm />} />
        <Route path="/itemCategories" element={<ItemCategoriesPage />} />
        <Route path="/addItemCategories" element={<AddItemCategoryForm />} />
        <Route
          path="/itemCategories/:id"
          element={<EditItemCategoriesForm />}
        />
        <Route path="/items/:id" element={<ItemDetailsPage />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="/api/users/signup" element={<Signup />} />
        <Route path="/api/users/signin" element={<Login />} />
        <Route path="/searchResults" element={<SearchResultsPage/>}/>
      </Route>
    )
  );
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );

};

export default App;