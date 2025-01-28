import React from 'react';
import Link from 'next/link';

const GaleriaReceitas = () => {
  return (
    <Link
      href="/"
      className="text-4xl font-bold text-gray-900 hover:text-gray-600 transition-colors duration-300"
      style={{
        fontFamily: `'Playfair Display', serif`,
      }}
    >
      <span className="bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
        Galeria De Receitas
      </span>
    </Link>
  );
};

export { GaleriaReceitas };
