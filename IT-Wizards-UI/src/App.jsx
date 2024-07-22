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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <CartProvider>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/addItems" element={<AddItemForm />} />
          <Route path="/items/editItem/:id" element={<EditItemForm />} />
          <Route path="/itemCategories" element={<ItemCategoriesPage />} />
          <Route path="/addItemCategories" element={<AddItemCategoryForm />} />
          <Route path="/itemCategories/:id"element={<EditItemCategoriesForm />}/>
          <Route path="/items/:id" element={<ItemDetailsPage />} />
        </Route>
      </CartProvider>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
