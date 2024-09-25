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
  const [isAnimating, setIsAnimating] = useState(false);
  const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE);

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  const nextPage = () => {
    setIsAnimating(true);
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    setTimeout(() => setIsAnimating(false), 300); // Reset animation state after 300ms
  };

  const prevPage = () => {
    setIsAnimating(true);
    setCurrentPage((prevPage) =>
      prevPage === 0 ? totalPages - 1 : prevPage - 1
    );
    setTimeout(() => setIsAnimating(false), 300); // Reset animation state after 300ms
  };

  const getCurrentAnnouncement = () => {
    return announcements[currentPage]; // Get current announcement
  };

  const styles = {
    panel: {
      position: 'fixed',
      top: isVisible ? '0' : '-55px',
      left: '0',
      right: '0',
      height: '55px',
      backgroundColor: isVisible ? 'transparent' : 'transparent', // Make it transparent to see gradient
      transition: 'top 0.5s ease',
      zIndex: '1000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: isVisible ? 'none' : '0 0 10px rgba(249, 211, 66, 0.5)', // Glowing shadow when hidden
      overflow: 'hidden',
      background: isVisible ? 'linear-gradient(90deg, #fffe5f, #feb47b)' : 'none', // Gradient background when visible
      animation: isVisible ? 'none' : 'glow 0.5s infinite alternate', // Glow animation when hidden
    },
    leftHalf: {
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      height: '100%',
    },
    rightHalf: {
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      height: '100%',
    },
    announcementContainer: {
      flex: '1',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.1s ease', // Transition for announcement movement
      transform: isAnimating ? (currentPage % totalPages === 0 ? 'translateX(-100%)' : 'translateX(100%)') : 'translateX(0)', // Move announcement based on animation
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
        <div
          style={styles.leftHalf}
          onClick={prevPage} // Click to go to previous announcement
        >
          <span style={{ cursor: 'pointer' }}>{""}</span>
        </div>

        <div style={styles.announcementContainer}>
          {/* Display only the current announcement */}
          <span>{getCurrentAnnouncement().message}</span>
        </div>

        <div
          style={styles.rightHalf}
          onClick={nextPage} // Click to go to next announcement
        >
          <span style={{ cursor: 'pointer' }}>{""}</span>
        </div>
      </div>
    </div>
  );
}

export default BulletinPanel;
