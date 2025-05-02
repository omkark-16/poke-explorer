import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import FilterDropdown from './components/FilterDropdown';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const promises = res.data.results.map(p => axios.get(p.url));
        const results = await Promise.all(promises);
        const formatted = results.map(r => ({
          id: r.data.id,
          name: r.data.name,
          image: r.data.sprites.front_default,
          types: r.data.types.map(t => t.type.name)
        }));
        setPokemonList(formatted);
        setFilteredList(formatted);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = pokemonList.filter(p =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (selectedType !== 'All') {
      filtered = filtered.filter(p => p.types.includes(selectedType));
    }
    setFilteredList(filtered);
  }, [searchText, selectedType, pokemonList]);

  return (
    <Router>
      <div className="App bg-gray-100 min-h-screen">
        <Header />
        <div className="controls flex flex-col md:flex-row gap-4 justify-center items-center p-4">
          <SearchBar value={searchText} onChange={e => setSearchText(e.target.value)} />
          <FilterDropdown selected={selectedType} onChange={e => setSelectedType(e.target.value)} />
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {loading && (
                  <div className="pokemon-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-white bg-opacity-70 h-60 rounded-lg shadow-md"
                      ></div>
                    ))}
                  </div>
                )}

                {!loading && error && (
                  <p className="text-red-600 text-center mt-4 text-lg">
                    Failed to fetch Pokémon. Try again later.
                  </p>
                )}

                {!loading && !error && (
                  <div className="pokemon-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
                    {filteredList.length ? (
                      filteredList.map(p => <PokemonCard key={p.id} pokemon={p} />)
                    ) : (
                      <p className="col-span-full text-center text-gray-500 text-lg">
                        No Pokémon match your search.
                      </p>
                    )}
                  </div>
                )}
              </>
            }
          />
           <Route
            path="/about"
            element={<div className="text-center mt-4">About Page</div>}
          />
          <Route
            path="/contact"
            element={<div className="text-center mt-4">contact Page</div>}
          />
        </Routes>
       

      </div>
    </Router>
  );
}

export default App;
