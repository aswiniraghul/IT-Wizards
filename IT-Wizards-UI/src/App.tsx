import React, { useEffect, useContext, useCallback } from "react";

import Header from "./components/PlaidComponents/Headers";
import Products from "./components/PlaidComponents/ProductTypes/Products";
import Items from "./components/PlaidComponents/ProductTypes/Items";
import PlaidContext from "./PlaidContext";

import styles from "./App.module.scss";

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

const App = () => {
  const { linkSuccess, isItemAccess, isPaymentInitiation, dispatch } = useContext(PlaidContext);

  const getInfo = useCallback(async () => {
    const response = await fetch("/api/info", { method: "POST" });
    if (!response.ok) {
      dispatch({ type: "SET_STATE", state: { backend: false } });
      return { paymentInitiation: false };
    }
    const data = await response.json();
    const paymentInitiation: boolean = data.products.includes(
      "payment_initiation"
    );
    dispatch({
      type: "SET_STATE",
      state: {
        products: data.products,
        isPaymentInitiation: paymentInitiation,
      },
    });
    return { paymentInitiation };
  }, [dispatch]);

  const generateToken = useCallback(
    async (isPaymentInitiation) => {
      // Link tokens for 'payment_initiation' use a different creation flow in your backend.
      const path = isPaymentInitiation
        ? "/api/create_link_token_for_payment"
        : "/api/create_link_token";
      const response = await fetch(path, {
        method: "POST",
      });
      if (!response.ok) {
        dispatch({ type: "SET_STATE", state: { linkToken: null } });
        return;
      }
      const data = await response.json();
      if (data) {
        if (data.error != null) {
          dispatch({
            type: "SET_STATE",
            state: {
              linkToken: null,
              linkTokenError: data.error,
            },
          });
          return;
        }
        dispatch({ type: "SET_STATE", state: { linkToken: data.link_token } });
      }
      // Save the link_token to be used later in the Oauth flow.
      localStorage.setItem("link_token", data.link_token);
    },
    [dispatch]
  );

  useEffect(() => {
    const init = async () => {
      const { paymentInitiation } = await getInfo(); // used to determine which path to take when generating token
      // do not generate a new token for OAuth redirect; instead
      // setLinkToken from localStorage
      if (window.location.href.includes("?oauth_state_id=")) {
        dispatch({
          type: "SET_STATE",
          state: {
            linkToken: localStorage.getItem("link_token"),
          },
        });
        return;
      }
      generateToken(paymentInitiation);
    };
    init();
  }, [dispatch, generateToken, getInfo]);


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/addItems" element={<AddItemForm />} />
        <Route path="/items/editItem/:id" element={<EditItemForm />} />
        <Route path="/itemCategories" element={<ItemCategoriesPage />} />
        <Route path="/addItemCategories" element={<AddItemCategoryForm />} />
        <Route path="/itemCategories/:id" element={<EditItemCategoriesForm />} />
      </Route>
    )
  );
  // return <RouterProvider router={router} />;
  
  return (
    <>
      <RouterProvider router={router} />
      <div className={styles.App}>
        <div className={styles.container}>
          <Header />
          {linkSuccess && (
            <>
              {isPaymentInitiation && (
                <Products />
              )}
              {isItemAccess && (
                <>
                  <Products />
                  <Items />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
