// import { useState } from "react";
// import ShoppingCartIcon from './assets/shopping-cart.png';
// import CloseIcon from './assets/closeIconx.png'; // if you have a close icon too




// export default function ShoppingCartPanel(cart: any) {
//   const cartItems = cart["cart"] || [];

//   const [promoCode, setPromoCode] = useState("");
//   const [discountApplied, setDiscountApplied] = useState(false);
//   const [isVisible, setIsVisible] = useState(false); // Hidden by default
//   const [discountValue, setDiscountValue] = useState(0);

//   const total = cartItems.reduce((acc: number, item: any) => acc + item.price, 0);
//   const discountedTotal = discountApplied ? total - discountValue : total;

//   const toggleCart = () => {
//     setIsVisible(!isVisible);
//   };

//   const applyPromoCode = () => {
//     if (promoCode === "SAVE10" || promoCode === "NEW15" || promoCode === "JOOLA25") {
//       setDiscountApplied(true);
//       setDiscountValue(total * 0.1); // Apply 10% discount
//     } else {
//       alert("Invalid promo code");
//     }
//   };

//   const styles = {
//     container: {
//       position: "fixed",
//       top: "0",
//       right: isVisible ? '0' : '-400px',
//       width: "400px",
//       height: "100vh",
//       backgroundColor: "#EFEFEF",
//       padding: "20px",
//       boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-between",
//       transition: 'right 0.5s ease',
//       overflowY: "auto",
//     },
//     promoSection: {
//       display: "flex",
//       flexDirection: "column",
//       marginBottom: "20px",
//     },
//     input: {
//       width: "100%",
//       padding: "10px",
//       marginBottom: "10px",
//     },
//     promoButton: {
//       padding: '10px',
//       fontSize: '16px',
//       backgroundColor: '#007bff',
//       color: 'white',
//       border: 'none',
//       cursor: 'pointer',
//       width: '100%',
//     },
//     successMessage: {
//       color: "green",
//       marginTop: "10px",
//     },
//     checkoutButton: {
//       backgroundColor: "#28a745",
//       color: "white",
//       padding: "15px",
//       border: "none",
//       cursor: "pointer",
//       width: "100%",
//       fontWeight: "bold",
//       marginTop: "20px",
//     },
//     totalText: {
//       fontWeight: 'bold',
//       fontSize: '18px',
//       marginTop: '20px',
//     },
//     iconButton: {
//       position: 'fixed',
//       right: '20px',
//       top: '10px',
//       cursor: 'pointer',
//       width: '40px',
//       height: '40px',
//       background: 'none',
//       border: 'none',
//       zIndex: '1000',
//     },
//     svg: {
//       width: '100%',
//       height: '100%',
//     },
//   };

//   return (
//     <div className="App">
//       {/* Cart Panel */}
//       <div style={styles.container}>
//         {cartItems.length > 0 ? (
//           <div>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Price ($)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item: any, index: any) => (
//                   <tr key={index}>
//                     <td>{item["productName"]}</td>
//                     <td>{item["price"]}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Promo Code Section */}
//             <div style={styles.promoSection}>
//               <input
//                 type="text"
//                 placeholder="Enter Promo Code"
//                 value={promoCode}
//                 onChange={(e) => setPromoCode(e.target.value)}
//                 style={styles.input}
//               />
//               <button onClick={applyPromoCode} style={styles.promoButton}>
//                 Apply Promo Code
//               </button>
//               {discountApplied && (
//                 <p style={styles.successMessage}>Promo code applied!</p>
//               )}
//             </div>

//             {/* Total and Discount */}
//             <p style={styles.totalText}>Total: ${total.toFixed(2)}</p>
//             {discountApplied && (
//               <p style={styles.totalText}>
//                 Discounted Total: ${discountedTotal.toFixed(2)}
//               </p>
//             )}

//             {/* Checkout Button */}
//             <button style={styles.checkoutButton}>Proceed to Checkout</button>
//           </div>
//         ) : (
//           <p>Your cart is empty</p>
//         )}
//       </div>

//       {/* Toggle Cart Icon */}
//       <button style={styles.iconButton} onClick={toggleCart}>
//         {isVisible ? (
//           <img src={CloseIcon} alt="Close" style={styles.svg} />
//         ) : (
//           <img src={ShoppingCartIcon} alt="Cart" style={styles.svg} />
//         )}
//       </button>
//     </div>
//   );
// }


import { useState } from "react";
import ShoppingCartIcon from './assets/shopping-cart.png';
import CloseIcon from './assets/closeIconx.png'; // if you have a close icon too

export default function ShoppingCartPanel(cart: any) {
  const cartItems = cart["cart"] || [];

  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Hidden by default
  const [discountValue, setDiscountValue] = useState(0);

  const total = cartItems.reduce((acc: number, item: any) => acc + item.price, 0);
  const discountedTotal = discountApplied ? total - discountValue : total;

  const toggleCart = () => {
    setIsVisible(!isVisible);
  };

  const applyPromoCode = () => {
    if (promoCode === "SAVE10" || promoCode === "NEW15" || promoCode === "JOOLA25") {
      setDiscountApplied(true);
      setDiscountValue(total * 0.1); // Apply 10% discount
    } else {
      alert("Invalid promo code");
    }
  };

  const styles = {
    container: {
      position: "fixed",
      top: "55px", // Same level as the bulletin panel
      right: isVisible ? '0' : '-400px',
      width: "400px",
      height: "100vh",
      backgroundColor: "#EFEFEF",
      padding: "20px",
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
      top: '70px', // Align this with the bulletin panel button
      right: '20px',
      cursor: 'pointer',
      width: '40px',
      height: '40px',
      background: 'none',
      border: 'none',
      zIndex: '1000', // Ensure visibility
    },    
    svg: {
      width: '100%',
      height: '100%',
    },
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

            {/* Promo Code Section */}
            <div style={styles.promoSection}>
              <input
                type="text"
                placeholder="Enter Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={styles.input}
              />
              <button onClick={applyPromoCode} style={styles.promoButton}>
                Apply Promo Code
              </button>
              {discountApplied && (
                <p style={styles.successMessage}>Promo code applied!</p>
              )}
            </div>

            {/* Total and Discount */}
            <p style={styles.totalText}>Total: ${total.toFixed(2)}</p>
            {discountApplied && (
              <p style={styles.totalText}>
                Discounted Total: ${discountedTotal.toFixed(2)}
              </p>
            )}

            {/* Checkout Button */}
            <button style={styles.checkoutButton}>Proceed to Checkout</button>
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      {/* Toggle Cart Icon */}
      <button style={styles.iconButton} onClick={toggleCart}>
        {isVisible ? (
          <img src={CloseIcon} alt="Close" style={styles.svg} />
        ) : (
          <img src={ShoppingCartIcon} alt="Cart" style={styles.svg} />
        )}
      </button>
    </div>
  );
}
