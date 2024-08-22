import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import AddItemForm from './components/items/AddItemForm';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage';
import EditItemForm from './components/items/EditItemForm';
import ItemCategoriesPage from './pages/ItemCategoriesPage';
import EditItemCategoriesForm from './components/items/EditItemCategoriesForm';
import AddItemCategoryForm from './components/items/AddItemCategoryForm';
import ItemDetailsPage from './pages/ItemDetailsPage';
import CartProvider from './components/CartContext';
import EditProfile from './components/profile/EditProfile';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactUs from './components/ContactUs';
import NotFoundPage from './pages/NotFoundPage';

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
        <Route
          path="/api/users/admin-signup"
          element={<Signup register="admin" />}
        />
        <Route path="/api/users/signin" element={<Login />} />
        <Route path="/wishlist/:id" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="*" element={<NotFoundPage />} />
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