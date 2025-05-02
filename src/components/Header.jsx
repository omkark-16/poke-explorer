import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/pokeexplorer_logo.png';



function Header() {
  const [searchText, setSearchText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  return (
    <header>
      <nav className="w-full rounded-b-[5px] bg-blue-500 p-2 shadow-md ">
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center space-x-4 ">
            <Link to={"/"} className="flex items-center">
            <img src={logo} className='w-16 h-16 object-cover rounded-full mr-2 ml-4 p-1'></img>
           
            <h1 className="text-white text-xl font-bold">Poke Explorer</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4 mr-10">
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>

            <div className="hidden md:flex space-x-8 ">
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
              <Link to="/about" className="text-white hover:text-gray-300">About</Link>
              <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4">
            
            <div className="px-4 py-2">
            <Link to="/" className="block text-white py-2 hover:bg-blue-700">Home</Link>
              <Link to="/about" className="block text-white py-2 hover:bg-blue-700">About</Link>
              <Link to="/contact" className="block text-white py-2 hover:bg-blue-700">Contact</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
