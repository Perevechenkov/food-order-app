import { useState } from 'react';

import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

export default function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const toggleCartHandler = () => {
    setCartIsShown(prevState => !prevState);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={toggleCartHandler} />}
      <Header onShowCart={toggleCartHandler} />;
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}
