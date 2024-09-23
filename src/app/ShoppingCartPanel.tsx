import { useState } from "react";
import ShoppingCartIcon from './assets/shopping-cart.png';
import CloseIcon from './assets/closeIconx.png'; // if you have a close icon too

export default function ShoppingCartPanel(cart: any) {
  const cartItems = cart["cart"] || [];

  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Hidden by default
  const [discountValue, setDiscountValue] = useState(0);
  const [promoVisible, setPromoVisible] = useState(false); // Control visibility of promo section
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const total = cartItems.reduce((acc: number, item: any) => acc + item.price, 0);
  const discountedTotal = discountApplied ? total - discountValue : total;

  const toggleCart = () => {
    setIsVisible(!isVisible);
  };

  const applyPromoCode = () => {
    let discount = 0; // Initialize discount value
  
    switch (promoCode) {
      case "SAVE10":
        discount = total * 0.10; // 10% discount
        break;
      case "NEW15":
        discount = total * 0.15; // 15% discount
        break;
      case "JOOLA25":
        discount = total * 0.25; // 25% discount
        break;
      default:
        setErrorMessage("Invalid promo code"); // Set error message for invalid codes
        setDiscountApplied(false); // Reset discount applied status
        setDiscountValue(0); // Reset discount value
        return; // Exit the function early if the code is invalid
    }
  
    // If the code is valid, apply the discount
    setDiscountApplied(true);
    setDiscountValue(discount);
    setErrorMessage(""); // Clear any previous error
  };
  

  const togglePromo = () => {
    setPromoVisible(!promoVisible);
    setErrorMessage(""); // Clear error message when toggling
  };

  const styles = {
    container: {
      position: "fixed",
      top: "55px", // Same level as the bulletin panel
      right: isVisible ? '0' : '-400px',
      width: "400px",
      height: "calc(100vh - 55px)", // Full height minus the top space
      backgroundColor: "#EFEFEF",
      padding: "60px 20px 20px 20px", // Top padding to create space for icons
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: 'right 0.5s ease',
      overflowY: "auto",
    },
    
    productBox: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    promoSection: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderColor: errorMessage ? "red" : "#ccc", // Change border color if there's an error
      borderWidth: errorMessage ? "2px" : "1px", // Thicker border for errors
    },
    promoButton: {
      padding: '10px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
    },
    successMessage: {
      color: "green",
      marginTop: "10px",
    },
    errorMessage: {
      color: "red", // Style for error message
      marginTop: "-10px",
      marginBottom: "10px",
      fontSize: "14px",
    },
    checkoutButton: {
      backgroundColor: "#28a745",
      color: "white",
      padding: "15px",
      border: "none",
      cursor: "pointer",
      width: "100%",
      fontWeight: "bold",
      marginTop: "20px",
    },
    totalText: {
      fontWeight: 'bold',
      fontSize: '18px',
      marginTop: '20px',
    },
    iconButton: {
      position: 'fixed',
      top: '10px', // Adjust this based on your design
      right: '20px',
      cursor: 'pointer',
      width: '40px',
      height: '40px',
      background: 'none',
      border: 'none',
      zIndex: '1000', // Ensure visibility
    },    
    closeIcon: {
      width: '25px',  // Smaller size for the close icon
      height: '25px', // Smaller size for the close icon
    },
    cartIcon: {
      width: '50px',  // Standard size for the shopping cart icon
      height: '50px', // Standard size for the shopping cart icon
    },
    promoToggle: {
      cursor: "pointer",
      color: "#007bff", // Bootstrap primary color
      textDecoration: "underline",
      marginBottom: "10px",
    }
  };

  return (
    <div className="App">
      {/* Cart Panel */}
      <div style={styles.container}>
        {cartItems.length > 0 ? (
          <div>
            {/* Product List */}
            {cartItems.map((item: any, index: any) => (
              <div key={index} style={styles.productBox}>
                <span>{item["productName"]}</span>
                <span>${item["price"].toFixed(2)}</span>
              </div>
            ))}

            {/* Promo Code Toggle */}
            <div style={styles.promoToggle} onClick={togglePromo}>
              {promoVisible ? "Hide promo code" : "Have a promo code?"}
            </div>

            {/* Promo Code Section */}
            {promoVisible && (
              <div style={styles.promoSection}>
                <input
                  type="text"
                  placeholder="Enter Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  style={styles.input}
                />
                {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>} {/* Show error message */}
                <button onClick={applyPromoCode} style={styles.promoButton}>
                  Apply Promo Code
                </button>
                {discountApplied && (
                  <p style={styles.successMessage}>Promo code applied!</p>
                )}
              </div>
            )}

            {/* Total and Discount */}
            <p style={styles.totalText}>Total: ${total.toFixed(2)}</p>
            {discountApplied && (
              <p style={styles.totalText}>
                Discounted Total: ${discountedTotal.toFixed(2)}
              </p>
            )}
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
        
        {/* Checkout Button */}
        <button style={styles.checkoutButton}>Proceed to Checkout</button>
      </div>

      {/* Toggle Cart Icon */}
      <button style={styles.iconButton} onClick={toggleCart}>
        {isVisible ? (
          <img src={CloseIcon.src} alt="Close" style={styles.closeIcon} />
        ) : (
          <img src={ShoppingCartIcon.src} alt="Cart" style={styles.cartIcon} />
        )}
      </button>
    </div>
  );
}
