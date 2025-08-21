import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background shadow-md py-6 mt-auto">
      <div className="container mx-auto px-6 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Gmpho. All rights reserved.</p>
        <p>Built with Next.js, Tailwind CSS, and AI.</p>
      </div>
    </footer>
  );
};

export default Footer;