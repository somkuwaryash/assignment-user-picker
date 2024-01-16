// ChipInput.js
import React, { useState, useEffect, useRef } from 'react';
import './ChipInput.css';

const ChipInput = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedChips, setSelectedChips] = useState([]);
  const [originalItems, setOriginalItems] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', logo: 'https://via.placeholder.com/24' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', logo: 'https://via.placeholder.com/24' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', logo: 'https://via.placeholder.com/24' },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', logo: 'https://via.placeholder.com/24' },
    { id: 5, name: 'Eva Davis', email: 'eva.davis@example.com', logo: 'https://via.placeholder.com/24' },
    { id: 6, name: 'Charlie Wilson', email: 'charlie.wilson@example.com', logo: 'https://via.placeholder.com/24' },
    { id: 7, name: 'Grace Taylor', email: 'grace.taylor@example.com', logo: 'https://via.placeholder.com/24' },
    { id: 8, name: 'Samuel Turner', email: 'samuel.turner@example.com', logo: 'https://via.placeholder.com/24' },

  ]);
  const [filteredItems, setFilteredItems] = useState(originalItems);

  const inputRef = useRef(null);

  const filterItems = (query) => {
    return originalItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.email.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    setFilteredItems(filterItems(inputValue));
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = (item) => {
    setSelectedChips([...selectedChips, item]);
    setOriginalItems(originalItems.filter((originalItem) => originalItem !== item));
    setFilteredItems(filterItems(''));
    setInputValue('');
    setIsMenuOpen(false);
  };

  const handleChipRemove = (removedChip) => {
    setSelectedChips(selectedChips.filter((chip) => chip !== removedChip));
    setOriginalItems([...originalItems, removedChip]);
    setFilteredItems(filterItems(''));
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="chip-input-container">
      <div className="chips-container">
        {selectedChips.map((chip) => (
          <div key={chip.id} className="chip">
            <div className="chip-logo-container">
              <img className="chip-logo" src={chip.logo} alt={chip.name} />
            </div>
            <div className="chip-info">
              <div className="chip-name">{chip.name}</div>
            </div>
            <span className="remove-icon" onClick={() => handleChipRemove(chip)}>
              X
            </span>
          </div>
        ))}
        <div className="input-container" ref={inputRef}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add new users.."
            className="input-field"
            onClick={handleMenuToggle}
          />
          {isMenuOpen && (
            <div className="menu-container">
              {filteredItems.length === 0 ? (
                <div className="no-results">No results found</div>
              ) : (
                filteredItems.map((item) => (
                  <div key={item.id} className="menu-item" onClick={() => handleItemClick(item)}>
                    <div className="menu-info">
                      <div className="menu-logo-container">
                        <img className="menu-logo" src={item.logo} alt={item.name} />
                      </div>
                      <div className="menu-details">
                        <div className="menu-name">{item.name}</div>
                        <div className="menu-email">{item.email}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bottom-line"></div>
    </div>
  );
};

export default ChipInput;
