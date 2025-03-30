import React from 'react';

interface HeaderProps {
  windowWidth: number;
}

const Header: React.FC<HeaderProps> = ({ windowWidth }) => {
  return (
    <>
      <h1 style={{
        fontSize: windowWidth < 640 ? '1.75rem' : windowWidth < 1024 ? '2.5rem' : '3rem',
        fontWeight: 300,
        textAlign: 'center',
        marginBottom: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        transition: 'font-size 0.3s ease'
      }}>Northern Spark Photography</h1>
      <p style={{
        textAlign: 'center', 
        fontWeight: 300,
        marginBottom: '2.5rem',
        fontSize: windowWidth < 640 ? '0.75rem' : '0.875rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#777',
        transition: 'font-size 0.3s ease'
      }}>Premium Senior & Family Photography in Nisswa, Minnesota</p>
    </>
  );
};

export default Header;