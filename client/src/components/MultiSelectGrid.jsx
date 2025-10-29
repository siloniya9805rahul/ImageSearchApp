import React from "react";

export default function MultiSelectGrid({ results = [], selected, setSelected }) {
  const toggle = (id) => {
    const copy = new Set(Array.from(selected));
    if (copy.has(id)) copy.delete(id);
    else copy.add(id);
    setSelected(copy);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {results.map((img) => (
        <div
          key={img.id}
          className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <img
            src={img.urls.small}
            alt={img.alt_description || "Image"}
            className="w-full h-48 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-300"
          />

          {/* Checkbox label */}
          <label
            className={`z-50 absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium cursor-pointer transition-all duration-200
              ${
                selected.has(img.id)
                  ? "bg-blue-600 text-white"
                  : "bg-black/50 text-gray-100 hover:bg-blue-500"
              }`}
          >
            <input
              type="checkbox"
              checked={selected.has(img.id)}
              onChange={() => toggle(img.id)}
              className="accent-blue-500 w-4 h-4 rounded"
            />
            Select
          </label>

          {/* Optional overlay when selected */}
          {selected.has(img.id) && (
            <div className="absolute inset-0 bg-blue-600/30 backdrop-blur-[1px] transition-opacity duration-300"></div>
          )}
        </div>
      ))}
    </div>
  );
}
