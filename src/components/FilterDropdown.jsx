import React from 'react';

const types = [
  'All', 'grass', 'fire', 'water', 'bug', 'normal', 'poison',
  'electric', 'ground', 'fairy', 'fighting', 'psychic',
  'rock', 'ghost', 'ice', 'dragon'
];

function FilterDropdown({ selected, onChange }) {
  return (
    <select value={selected} onChange={onChange} className="filter-dropdown h-12 md:w-30 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
      {types.map(t => <option key={t} value={t}>{t}</option>)}
    </select>
  );
}

export default FilterDropdown;
