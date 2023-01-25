import React, { useEffect, useState } from "react";
import { idbPromise } from "../utils/helpers";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from "../assets/spinner.gif";
import Cart from "../components/Cart";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      // update indexedDB, use existing item data and increment
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      // if product isn't in cart yet in IndexedDB, add it
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });
    // updated IndexedDB
    idbPromise("cart", "delete", { ...currentProduct });
  };

  useEffect(() => {
    // check if there's data in our store's products array. if there is, we can figure out which product is the current one that we want to display
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
      // if this is the user's first time navigating to the page and there is nothing in the store yet,
    } else if (data) {
      // save to store
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      // save every product to IndexedDB
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
