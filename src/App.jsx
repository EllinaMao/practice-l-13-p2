import React, { useState } from "react";
import { ProductList } from "./features/products/ProductList";
import { Cart } from "./features/cart/Cart";
import { useSelector } from "react-redux";
 
function App() {
  const [showCart, setShowCart] = useState(false);
 
  const cartCount = useSelector((state) =>
    state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)
  );
 
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "0 auto",
        fontFamily: "Arial",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #333",
          paddingBottom: "10px",
        }}
      >
        <h1>My Redux Store</h1>
        <button
          onClick={() => setShowCart(!showCart)}
          style={{ padding: "10px 20px", fontSize: "1rem", cursor: "pointer" }}
        >
          {showCart ? "To products" : `🛒 Cart (${cartCount})`}
        </button>
      </header>
 
      <main style={{ marginTop: "20px" }}>
        {showCart ? <Cart /> : <ProductList />}
      </main>
    </div>
  );
}
 
export default App;


 