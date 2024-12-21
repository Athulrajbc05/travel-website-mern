import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { places } from '../assets/Data/tourismData';
import '../../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [destination, setDestination] = useState('');
  const [showDestinations, setShowDestinations] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const popularDestinations = places.map(place => place.name);

  const handleSearch = () => {
    onSearch({
      destination,
      checkInDate,
      checkOutDate,
      guests
    });
  };

  return (
    <div className="search-bar">
      <div className="search-field">
        <label>Where</label>
        <input
          type="text"
          placeholder="Search destinations"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onFocus={() => setShowDestinations(true)}
        />
        {showDestinations && (
          <ul className="destination-dropdown">
            {popularDestinations.map((place, index) => (
              <li
                key={index}
                onClick={() => {
                  setDestination(place);
                  setShowDestinations(false);
                }}
              >
                {place}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="search-field">
        <label>Check in</label>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          placeholderText="Add dates"
          dateFormat="MM/dd/yyyy"
          minDate={new Date()}
        />
      </div>

      <div className="search-field">
        <label>Check out</label>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          placeholderText="Add dates"
          dateFormat="MM/dd/yyyy"
          minDate={checkInDate || new Date()}
        />
      </div>

      <div className="search-field">
        <label>Add Guest</label>
        <div className="guest-selector">
          <button
            type="button"
            onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>
          <span>{guests} guest{guests > 1 ? "s" : ""}</span>
          <button
            type="button"
            onClick={() => setGuests((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </div>

      <button className="search-button" onClick={handleSearch}>
        <span>&#128269;</span>
      </button>
    </div>
  );
};

export default SearchBar;
