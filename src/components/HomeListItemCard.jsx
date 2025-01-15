import React from 'react';

const ListItemCard = ({ doll }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4 max-w-sm">
      <a href={doll.url} target="_blank" rel="noopener noreferrer">
        <img
          src={doll.images[0]}
          alt={doll.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      </a>
      <h2 className="text-lg font-bold text-gray-800">{doll.name}</h2>
      <p className="text-gray-600 text-sm my-2">{doll.description}</p>
      <p className="text-gray-700 text-sm">
        <strong>Size:</strong> {doll.size}
      </p>
      <p className="text-gray-700 text-sm">
        <strong>Materials:</strong> {doll.materials}
      </p>
      <p className="text-pink-600 font-bold text-lg mt-4">${doll.price}</p>
      <a
        href={doll.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center bg-pink-500 text-white py-2 px-4 mt-4 rounded hover:bg-pink-600"
      >
        View Details
      </a>
    </div>
  );
};

export default ListItemCard;
