import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} FactFlow AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
