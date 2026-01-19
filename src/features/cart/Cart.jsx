import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "./cartSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  // Достаем массив товаров из стейта корзины
  const { cartItems } = useSelector((state) => state.cart);

  // Считаем общую сумму заказа
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div
        style={{ padding: "20px", border: "1px solid #eee", marginTop: "20px" }}
      >
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        border: "1px dashed #333",
        marginTop: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>🛒 Cart</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cartItems.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              paddingBottom: "5px",
            }}
          >
            <div>
              <strong>{item.title}</strong> — {item.price}$ x {item.quantity}
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              style={{
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div
        style={{ marginTop: "20px", fontSize: "1.2rem", fontWeight: "bold" }}
      >
        Total: {totalAmount.toFixed(2)} $
      </div>
    </div>
  );
};
