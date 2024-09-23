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

  const fetchProducts = () => {
    fetch("http://localhost:7001/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setShowProducts(!showProducts); // Toggle visibility of products
      });
  };

  const addToCart = (product: any) => {
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
      marginTop: '120px', // Move content down to ensure it's below the panel
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    joolaHeading: {
      fontSize: '96px', // Increase the font size
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#fd342', // Give a bright, visually appealing color
      margin: '50px 0',
      textShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)', // Add shadow for emphasis
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      width: '100%',
      maxWidth: '1200px', // Limit the width to ensure layout looks good on wide screens
      margin: '0 auto', // Center the container on the page
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
      padding: '15px', // Slightly increase padding for a balanced look
      backgroundColor: '#ffcd00', // Use a bright, appealing color (gold/yellow)
      color: '#333', // Dark text for contrast
      borderRadius: '12px', // Soften the corners a bit more
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add subtle shadow for depth
      transition: 'transform 0.2s ease', // Smooth transition for hover effects
    },
    
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)', // 2 products per row
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
  };

  return (
    <div className="App">
      <header className="App-header">
        <ShoppingCartPanel cart={cart} />
        <BulletinPanel />

        {/* Joola Heading at the center */}
        <div style={styles.content}>
          <h1 style={styles.joolaHeading}>JOOLA</h1>
          <button style={styles.button} onClick={fetchProducts}>
            Display Products
          </button>
        </div>

        {showProducts && (
          <div style={styles.container}>
            {/* Pickleball Section */}
            <div style={styles.categorySection}>
              <h2 style={styles.header}>Pickleball</h2>
              <div style={styles.productGrid}>
                {(products as any)["Pickleball"]?.map((product: any, idx: number) => (
                  <div key={idx} style={styles.productCard}>
                    <div style={styles.productTitle}>{product.productName}</div>
                    <div style={styles.productPrice}>${product.price}</div>
                    <div style={styles.productDescription}>{product.productDescription}</div>
                    <button style={styles.addButton} onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Tennis Section */}
            <div style={styles.categorySection}>
              <h2 style={styles.header}>Table Tennis</h2>
              <div style={styles.productGrid}>
                {(products as any)["TableTennis"]?.map((product: any, idx: number) => (
                  <div key={idx} style={styles.productCard}>
                    <div style={styles.productTitle}>{product.productName}</div>
                    <div style={styles.productPrice}>${product.price}</div>
                    <div style={styles.productDescription}>{product.productDescription}</div>
                    <button style={styles.addButton} onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Home;
