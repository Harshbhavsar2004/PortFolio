import React from 'react';
import "./Contact.css"
const LoadingScreen = () => {
  return (
    <div style={styles.container}>
      <p>Loading...</p>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    color: '#fff',
    zIndex: 9999,
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #fff',
    borderTop: '5px solid #000',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

export default LoadingScreen;
