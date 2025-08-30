import React, { useRef, useEffect, useState } from "react";

function SearchBar({ value, onChange, onSearch, suggestions = [], onSuggestionClick }) {
  const inputRef = useRef();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    // Hide suggestions if the input matches exactly one suggestion (case-insensitive)
    if (
      suggestions.length > 0 &&
      value.trim() &&
      !suggestions.some(
        (s) => s.toLowerCase() === value.trim().toLowerCase()
      )
    ) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [suggestions, value]);

  // Hide suggestions on blur (with a slight delay for click)
  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-6 w-full relative">
      <div className="w-full relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter city..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => {
            if (
              suggestions.length > 0 &&
              !suggestions.some(
                (s) => s.toLowerCase() === value.trim().toLowerCase()
              )
            ) {
              setShowSuggestions(true);
            }
          }}
          className="px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 text-lg w-full"
          autoComplete="off"
        />
        {showSuggestions && (
          <ul className="absolute left-0 right-0 bg-white border border-blue-200 rounded-lg shadow z-10 mt-1 max-h-48 overflow-y-auto">
            {suggestions.map((s, idx) => (
              <li
                key={s + idx}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onMouseDown={() => {
                  onSuggestionClick && onSuggestionClick(s);
                  setShowSuggestions(false);
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          onSearch();
          setShowSuggestions(false);
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;