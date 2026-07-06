import React from "react";
import { IoLocationSharp } from "react-icons/io5";

const locations = [
  "Connaught Place, Delhi",
  "Karol Bagh, Delhi",
  "Noida Sector 62",
  "Cyber City, Gurugram",
  "MG Road, Gurugram",
  "Rajouri Garden, Delhi",
  "Lajpat Nagar, Delhi",
  "Dwarka Sector 21",
  "Janakpuri, Delhi",
  "Rohini Sector 18",
  "Saket, Delhi",
  "Pitampura, Delhi",
  "Vaishali, Ghaziabad",
  "Indirapuram, Ghaziabad",
  "Sector 18, Noida",
  "Greater Kailash, Delhi",
  "Vasant Kunj, Delhi",
];

const LocationSearch = ({ search = "", onSelect }) => {
  const filteredLocations = search.trim()
    ? locations.filter((location) =>
        location.toLowerCase().includes(search.toLowerCase())
      )
    : locations.slice(0, 8);

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      {filteredLocations.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          No locations found.
        </div>
      ) : (
        filteredLocations.map((location, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect?.(location)}
            className="w-full flex items-center gap-4 px-4 py-4 border-b last:border-none hover:bg-gray-100 transition-all duration-200 text-left"
          >
            <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center">
              <IoLocationSharp className="text-xl text-black" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">{location}</h3>
              <p className="text-sm text-gray-500">
                Tap to select this location
              </p>
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default LocationSearch;