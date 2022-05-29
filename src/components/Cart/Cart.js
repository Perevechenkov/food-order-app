import { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.scss';
import Checkout from './Checkout';

export default function Cart(props) {
  const cartCtx = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);

  const totalAmount = `$${Math.abs(cartCtx.totalAmount.toFixed(2))}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);

    if (cartCtx.items[0].amount === 1) setIsCheckout(false);
  };

  const orderHadler = () => {
    setIsCheckout(true);
  };

  const submitOrderHadnler = async userData => {
    try {
      const response = await fetch(
        'https://movies-dummy-db-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderItems: cartCtx.items,
            totalAmount: cartCtx.totalAmount,
          }),
        }
      );

      if (!response.ok) throw new Error(response.statusText);
    } catch (err) {
      console.log(err.message);
    }
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHadler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && hasItems && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHadnler} />
      )}
      {!isCheckout && modalActions}
    </Modal>
  );
}
