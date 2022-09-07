import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from  '../../utils/helpers';
import Auth from '../../utils/auth';
import './style.css';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// functional component
const Cart = () => {
  const [state, dispatch] = useStoreContext();

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart]});
    }
    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  // useEffect() hook specifically for Stripe to watch for changes to the data variable. redirect to Stripe once the data variable has data in it.
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      })
    }
  }, [data]);
  // function to toggle cart 
  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }
  // calculate the total price of the items in the cartt
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }
  // get the product id's for the items in the cart
  function submitCheckout() {
    const productIds = [];
    
    state.cart.forEach((item) => {
      for (let i=0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });
    // get the checkout session
    getCheckout({
      variables: { products: productIds }
    });
  }


  // if the cart is closed, toggle to open if cart is clicked
  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span 
          role="img" aria-label="trash">
            🛒
        </span>
      </div>
    )
  }
  // console.log(state);
  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>[close]</div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {
              Auth.loggedIn() ?
                <button onClick={submitCheckout}>
                  Checkout
                </button>
                :
                <span>(log in to check out)</span>
            }
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>

  )
};

export default Cart;