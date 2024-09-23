"use client";
import React, { useState } from "react";
import ShoppingCartPanel from "./ShoppingCartPanel";
import BulletinPanel from "./BulletinPanel";

const announcements = [
  { id: 1, message: "New Product Launch: XYZ 2024!" },
  { id: 2, message: "Flash Sale: Up to 50% off!" },
  { id: 3, message: "Quarterly earnings report now available." }
];

function Home() {
  const [products, setProducts] = useState({});
  const [showProducts, setShowProducts] = useState(false);
  const [cart, setCart] = useState([]);
  const [sortOrder, setSortOrder] = useState("lowToHigh");

  const fetchProducts = () => {
    fetch("http://localhost:7001/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setShowProducts(!showProducts); // Toggle visibility of products
      });
  };

  const addToCart = (product) => {
    fetch("http://localhost:7001/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        setCart(data.cart);
        alert(data.message);
      });
  };

  const sortProducts = (category) => {
    return [...(products[category] || [])].sort((a, b) => {
      if (sortOrder === "lowToHigh") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const styles = {
    button: {
      margin: '20px auto',
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#333',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'block',
    },
    content: {
      marginTop: '120px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    joolaHeading: {
      fontSize: '96px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#fd342',
      margin: '50px 0',
      textShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)',
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    categorySection: {
      flex: '1',
      margin: '0 10px',
    },
    header: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#ffcd00',
      color: '#333',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease',
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      marginTop: '20px',
    },
    productCard: {
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      backgroundColor: '#fff',
    },
    productTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    productPrice: {
      color: 'green',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    productDescription: {
      fontSize: '14px',
      marginBottom: '10px',
    },
    addButton: {
      padding: '8px 12px',
      backgroundColor: '#333',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
    },
    sortDropdown: {
      margin: '10px 0',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
  };

  return (
    <div className="App">
      <header className="App-header">
        <ShoppingCartPanel cart={cart} />
        <BulletinPanel />

        <div style={styles.content}>
          <h1 style={styles.joolaHeading}>JOOLA</h1>
          <button style={styles.button} onClick={fetchProducts}>
            Display Products
          </button>

          {showProducts && (
            <>
              <select style={styles.sortDropdown} value={sortOrder} onChange={handleSortChange}>
                <option value="lowToHigh">Sort Price: Low to High</option>
                <option value="highToLow">Sort Price: High to Low</option>
              </select>

              <div style={styles.container}>
                {/* Pickleball Section */}
                <div style={styles.categorySection}>
                  <h2 style={styles.header}>Pickleball</h2>
                  <div style={styles.productGrid}>
                    {sortProducts("Pickleball").map((product, idx) => (
                      <div key={idx} style={styles.productCard}>
                        <div style={styles.productTitle}>{product.productName}</div>
                        <div style={styles.productPrice}>${product.price}</div>
                        <div style={styles.productDescription}>{product.productDescription}</div>
                        <button style={styles.addButton} onClick={() => addToCart(product)}>
                          Buy Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Table Tennis Section */}
                <div style={styles.categorySection}>
                  <h2 style={styles.header}>Table Tennis</h2>
                  <div style={styles.productGrid}>
                    {sortProducts("TableTennis").map((product, idx) => (
                      <div key={idx} style={styles.productCard}>
                        <div style={styles.productTitle}>{product.productName}</div>
                        <div style={styles.productPrice}>${product.price}</div>
                        <div style={styles.productDescription}>{product.productDescription}</div>
                        <button style={styles.addButton} onClick={() => addToCart(product)}>
                          Buy Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default Home;
