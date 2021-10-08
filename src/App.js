import "./styles.css";
import { useCart } from "./CartContext";
import { useState, useRef, useEffect } from "react";
import { useTheme, darkTheme, lightTheme } from "./ThemeContext";

const products = [
  {
    id: 1,
    name: "kaala chasma",
    price: 1200
  },
  {
    id: 2,
    name: "laal chhadi",
    price: 1500
  },
  {
    id: 3,
    name: "jalebi",
    price: 50
  },
  {
    id: 4,
    name: "japani joota",
    price: 500
  }
];

function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  setTheme(darkTheme);
  console.log({ theme });
}

const CartHeader = () => {
  const { itemsInCart } = useCart();

  return <h4>Items in Cart {itemsInCart.length}</h4>;
};

const ProductListing = () => {
  const { setItemsinCart } = useCart();
  return (
    <div>
      <h1>Products</h1>
      {products.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid black",
            margin: "0.5rem",
            padding: "0.5rem"
          }}
        >
          <h2>{item.name}</h2>
          <p>{item.price}</p>
          <button onClick={() => setItemsinCart((items) => [...items, item])}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

function Cart() {
  const { itemsInCart } = useCart();
  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {itemsInCart.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid black",
              margin: "0.5rem",
              padding: "0.5rem"
            }}
          >
            <h2>{item.name}</h2>
            <p>{item.price}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}

function CheckOut() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleCardSubmit() {
    const cardDetails = inputRef.current.value;
    console.log({ cardDetails });
  }

  return (
    <>
      <label>
        Credit Card Number :
        <input type="text" ref={inputRef} />
      </label>
      <button onClick={handleCardSubmit}>Submit</button>
    </>
  );
}

export default function App() {
  const [route, setRoute] = useState("products");
  return (
    <div className="App">
      <div className="app-header">eCommerce</div>
      {/* <button style={{color:"theme.color",backgroundColor:"theme.backgroundColor"}} onClick={()=>setRoute("products")}>Products</button> */}
      <button onClick={() => setRoute("cart")}>Cart</button>
      <button onClick={() => setRoute("checkout")}>CheckOut</button>
      <button onClick={ToggleTheme}>Toggle</button>
      <CartHeader />
      {route === "cart" && <Cart />}
      {route === "products" && <ProductListing />}
      {route === "checkout" && <CheckOut />}
    </div>
  );
}
