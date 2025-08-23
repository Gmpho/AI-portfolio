import React from 'react';

const Header = () => {
  return (
    <header className="bg-background shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">Gift mpho</div>
        <ul className="flex space-x-6">
          <li><a href="#about" className="hover:text-primary">About</a></li>
          <li><a href="#projects" className="hover:text-primary">Projects</a></li>
          <li><a href="#contact" className="hover:text-primary">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
