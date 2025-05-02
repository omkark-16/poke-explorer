import React from 'react';

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search Pokemon..."
      value={value}
      onChange={onChange}
      className=" md:w-80 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    />
  );
}

export default SearchBar;
