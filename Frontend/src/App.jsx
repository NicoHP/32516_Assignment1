import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:5000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null); // added error state for debugging
  const [showPopup, setShowPopup] = useState(false);

  // fetch data when load
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // api calls using fetch
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error("Backend connection failed");
      const data = await res.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to connect to backend. Make sure Node server is running.");
    }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_URL}/cart`);
      if (!res.ok) throw new Error("Backend connection failed");
      const data = await res.json();

      // force it to be an array
      setCart(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // CREAT: add to cart
  const addToCart = async (productId) => {
    try {
      await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
      fetchCart();   // refresh cart
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // UPDATE: change quantity
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    await fetch(`${API_URL}/cart/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity })
    });
    fetchCart();
  };

  // DELETE: remove from cart
  const removeFromCart = async (id) => {
    await fetch(`${API_URL}/cart/${id}`, {
      method: 'DELETE'
    });
    fetchCart();
  };

  console.log("Current Products State:", products);
  console.log("Current Cart State:", cart);

  // calculate price
  const cartTotal = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + ((item.productId?.price || 0) * item.quantity), 0)
    : 0;

  // UI
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Tech Gadget Store</h1>
      </header>

      {error && <div style={{ color: 'red', textAlign: 'center', padding: '10px' }}>{error}</div>}

      <main className="main-layout">
        <section className="product-section">
          <h2>Products</h2>
          <div className="product-grid">
            {Array.isArray(products) && products.map(product => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price?.toFixed(2)}</p>
                  <button onClick={() => addToCart(product._id)} className="add-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="cart-section">
          <h2>Your Cart</h2>
          {(!Array.isArray(cart) || cart.length === 0) ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <>
              <div className="cart-list">
                {Array.isArray(cart) && cart.map(item => (
                  <div key={item._id} className="cart-item">
                    {/* ... your existing cart item code ... */}
                    <div className="item-details">
                      <p className="item-name">{item.productId?.name || "Unknown Item"}</p>
                      <p className="item-price">${item.productId?.price?.toFixed(2) || "0.00"}</p>
                    </div>
                    <div className="item-controls">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                      <button onClick={() => removeFromCart(item._id)} className="remove-btn">Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              { }
              <div className="cart-summary" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #edf2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>Total:</h3>
                <h3 style={{ margin: 0, color: '#48bb78' }}>${cartTotal.toFixed(2)}</h3>
              </div>

              {}
              <button className="checkout-btn" onClick={() => setShowPopup(true)}>
                Checkout
              </button>
            </>
          )}
        </aside>
      </main>

      { }
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Proceed to Checkout</h2>
            <p>This Feature is Coming Soon!</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
