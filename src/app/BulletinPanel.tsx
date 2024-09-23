import React, { useState } from "react";

const announcements = [
  { id: 1, message: "New Product Launch: PICKLE RICK!" },
  { id: 2, message: "Black Friday Flash Sale: Up to 50% off!" },
  { id: 3, message: "Quarterly earnings report now available." },
  { id: 4, message: "Celebrate Your Birthday with Us: 20% Off!" },
  { id: 5, message: "Use Code `NEW15` for 15% off." },
  { id: 6, message: "New Products and Skins Coming Soon" },
  { id: 7, message: "Buy One, Get One Free!" }
];

const ITEMS_PER_PAGE = 1;

function BulletinPanel() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE);

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? totalPages - 1 : prevPage - 1
    );
  };

  const getCurrentAnnouncements = () => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return announcements.slice(startIndex, endIndex);
  };

  const styles = {
    panel: {
      position: 'fixed',
      top: isVisible ? '0' : '-55px',
      left: '0',
      right: '0',
      height: '55px',
      backgroundColor: '#333',
      color: '#fff',
      padding: '5px 0',
      fontSize: '16px',
      textAlign: 'center',
      transition: 'top 0.5s ease',
      zIndex: '1000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden',
    },
    announcementsContainer: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: '100%',
      animation: 'scroll 5s linear infinite',
    },
    arrowButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50px',
      height: '50px',
      borderRadius: '50px',
      backgroundColor: '#f9d342',
      boxShadow: '0px 0px 10px rgba(249, 211, 66, 0.5)',
      cursor: 'pointer',
      transition: 'box-shadow 0.3s ease',
    },
    arrowButton: {
      fontSize: '24px',
      color: '#333',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
    },
    toggleButton: {
      position: 'fixed',
      top: '60px', // Keep button fixed at one position
      left: '50%',
      transform: 'translateX(-50%)',
      cursor: 'pointer',
      fontSize: '30px',
      background: 'transparent',
      border: 'none',
      color: isVisible ? '#666877' : '#666877', // Color when hidden
      transition: 'color 0.3s ease', // Smooth transition for color
      animation: isVisible ? 'glow 1s infinite alternate' : 'none',
    },
    arrowIcon: {
      display: 'inline-block',
      transform: isVisible ? 'rotate(0deg)' : 'rotate(180deg)', // Rotating the arrow
      transition: 'transform 0.5s ease', // Smooth arrow rotation
    }
  };

  return (
    <div className="App">
      {/* Toggle Button */}
      <button
        style={styles.toggleButton}
        onClick={togglePanel}
      >
        <span style={styles.arrowIcon}>{isVisible ? '▲' : '▼'}</span> {/* Rotate only arrow */}
      </button>

      {/* Bulletin Panel */}
      <div style={styles.panel}>
        <div style={styles.arrowButtonContainer} onClick={prevPage}>
          <button style={styles.arrowButton}>{"<"}</button>
        </div>

        <div style={styles.announcementsContainer}>
          {getCurrentAnnouncements().map((announcement) => (
            <span key={announcement.id} style={{ margin: '0 10px' }}>
              {announcement.message}
            </span>
          ))}
        </div>

        <div style={styles.arrowButtonContainer} onClick={nextPage}>
          <button style={styles.arrowButton}>{">"}</button>
        </div>
      </div>
    </div>
  );
}

export default BulletinPanel;
