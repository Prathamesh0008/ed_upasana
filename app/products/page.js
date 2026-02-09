'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import products from '../data/en';
import { useCart } from '../context/CartContext';

/* ----------------------------------------
   Convert en.js object → Array
---------------------------------------- */
const getAllProducts = () => {
  return Object.values(products).map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: Number(p.price),
    image: p.image,
    brand: p.brand,
    dosage: p.dosage,
    composition: p.composition,
    category: p.category,
    packSize: p.packSize,
    description: p.description,
    rating: 4.5,
    stock: 50,
  }));
};

/* ----------------------------------------
   Product Card
---------------------------------------- */
function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    setIsAdding(true);

    addToCart({
      id: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      brand: product.brand,
      dosage: product.dosage,
      packSize: product.packSize,
    });

    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">

      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 rounded-t-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">

        {/* Brand */}
        <span className="text-xs font-semibold mb-1 bg-gradient-to-r from-[#2596be] to-[#122E34] text-white px-3 py-1 rounded-full w-fit shadow-sm">
          {product.brand}
        </span>

        {/* Name */}
        <h3 className="font-bold text-lg mb-1 line-clamp-2 text-gray-800">
          {product.name}
        </h3>

        {/* Composition */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.composition}
        </p>

        {/* Rating */}
        <div className="flex items-center text-yellow-400 mb-3">
          {'★★★★★'.slice(0, Math.round(product.rating))}
          <span className="text-gray-500 ml-2 text-sm">
            ({product.rating})
          </span>
        </div>

        {/* Price */}
        <div className="text-xl font-bold mb-4 bg-gradient-to-r from-[#2596be] to-[#122E34] bg-clip-text text-transparent">
          ₹{product.price}
        </div>

        {/* Qty - Updated Gradient */}
        <div className="flex items-center mb-4 rounded-xl w-fit overflow-hidden border border-gray-200 shadow-lg">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-5 py-2 bg-gradient-to-r from-[#2596be] to-[#122E34] text-white hover:opacity-90 transition-all duration-300 shadow-inner active:scale-95"
          >
            <span className="font-bold text-lg">−</span>
          </button>
          <span className="px-5 py-2 bg-gradient-to-r from-gray-50 to-white font-bold min-w-[60px] text-center text-gray-800 text-lg border-l border-r border-gray-200">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="px-5 py-2 bg-gradient-to-r from-[#2596be] to-[#122E34] text-white hover:opacity-90 transition-all duration-300 shadow-inner active:scale-95"
          >
            <span className="font-bold text-lg">+</span>
          </button>
        </div>

        {/* Buttons */}
        <div className="mt-auto space-y-3">

          {/* Updated Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-gradient-to-r from-[#2596be] to-[#122E34] text-white py-3.5 rounded-xl font-bold hover:shadow-2xl hover:scale-[1.02] hover:opacity-90 transition-all duration-400 relative overflow-hidden group"
          >
            {/* Shine effect */}
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            
            {/* Button text */}
            <span className="relative flex items-center justify-center gap-2">
              {isAdding ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to Cart
                </>
              )}
            </span>
          </button>

          {/* View Details Button with Updated Gradient Border */}
          <Link
            href={`/products/${product.slug}`}
            className="group relative w-full text-center py-3.5 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            {/* Gradient background on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            
            {/* Updated Gradient border */}
            <span className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-[#2596be] to-[#122E34]">
              <span className="absolute inset-0 bg-white rounded-xl"></span>
            </span>
            
            {/* Text with updated gradient */}
            <span className="relative bg-gradient-to-r from-[#2596be] to-[#122E34] bg-clip-text text-transparent font-semibold flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              View Details
            </span>
          </Link>

        </div>

      </div>
    </div>
  );
}

/* ----------------------------------------
   Enhanced Filter Box with Updated Gradients
---------------------------------------- */
function FilterBox({ title, items, selected, onSelect }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-1 w-8 bg-gradient-to-r from-[#2596be] to-[#122E34] rounded-full"></div>
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
      </div>

      <div className="space-y-1">
        <button
          onClick={() => onSelect('All')}
          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
            selected === 'All' 
              ? 'bg-gradient-to-r from-[#2596be] to-[#122E34] text-white shadow-md' 
              : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${selected === 'All' ? 'bg-white' : 'bg-gradient-to-r from-[#2596be] to-[#122E34]'}`}></div>
          <span className="font-medium">All</span>
          {selected === 'All' && (
            <svg className="w-4 h-4 ml-auto opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
              selected === item 
                ? 'bg-gradient-to-r from-[#2596be] to-[#122E34] text-white shadow-md' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${selected === item ? 'bg-white' : 'bg-gradient-to-r from-[#2596be] to-[#122E34]'}`}></div>
            <span className="font-medium">{item}</span>
            {selected === item && (
              <svg className="w-4 h-4 ml-auto opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------
   Pagination with Updated Gradient
---------------------------------------- */
function Pagination({ page, total, onChange }) {
  return (
    <div className="flex justify-center gap-3 mt-8">

      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-[#2596be] to-[#122E34] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:scale-[1.05] hover:opacity-90 transition-all duration-300 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Prev
      </button>

      <div className="flex items-center gap-2">
        {[...Array(total)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onChange(i + 1)}
            className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
              page === i + 1
                ? 'bg-gradient-to-r from-[#2596be] to-[#122E34] text-white shadow-lg transform scale-105'
                : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-[#2596be]/10 hover:to-[#122E34]/10 hover:shadow-md'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        disabled={page === total}
        onClick={() => onChange(page + 1)}
        className="px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-[#2596be] to-[#122E34] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:scale-[1.05] hover:opacity-90 transition-all duration-300 flex items-center gap-2"
      >
        Next
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  );
}

/* ----------------------------------------
   Main Page
---------------------------------------- */
export default function ProductsPage() {

  const [brand, setBrand] = useState('All');
  const [compound, setCompound] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const perPage = 12;

  const allProducts = getAllProducts();

  /* Get Filters */
  const brands = [...new Set(allProducts.map(p => p.brand))];
  const compounds = [...new Set(allProducts.map(p => p.composition))];

  /* Filter */
  const filtered = allProducts.filter((p) => {

    if (brand !== 'All' && p.brand !== brand) return false;
    if (compound !== 'All' && p.composition !== compound) return false;

    if (
      search &&
      !p.name.toLowerCase().includes(search.toLowerCase())
    ) return false;

    return true;
  });

  /* Pagination */
  const totalPages = Math.ceil(filtered.length / perPage);

  const data = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  useEffect(() => {
    setPage(1);
  }, [brand, compound, search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">

            <div className="relative">
              <input
                type="text"
                placeholder="Search for medicines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#2596be] focus:ring-2 focus:ring-[#2596be]/20 transition-all duration-300 bg-white shadow-sm"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="sticky top-8 space-y-6">
              <div className="bg-gradient-to-br from-white to-gray-50 p-1 rounded-2xl shadow-lg">
                <FilterBox
                  title="Brands"
                  items={brands}
                  selected={brand}
                  onSelect={setBrand}
                />
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 p-1 rounded-2xl shadow-lg">
                <FilterBox
                  title="Compounds"
                  items={compounds}
                  selected={compound}
                  onSelect={setCompound}
                />
              </div>
            </div>

          </div>

          {/* Products */}
          <div className="lg:w-3/4">

            {/* Results Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-2xl border border-gray-100">
              <p className="text-gray-700">
                Showing <span className="font-bold text-[#2596be]">{data.length}</span> of <span className="font-bold text-[#2596be]">{filtered.length}</span> products
                {brand !== 'All' && (
                  <span className="ml-2">
                    • Brand: <span className="font-semibold bg-gradient-to-r from-[#2596be] to-[#122E34] bg-clip-text text-transparent">{brand}</span>
                  </span>
                )}
                {compound !== 'All' && (
                  <span className="ml-2">
                    • Compound: <span className="font-semibold bg-gradient-to-r from-[#2596be] to-[#122E34] bg-clip-text text-transparent">{compound}</span>
                  </span>
                )}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

              {data.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}

            </div>

            {totalPages > 1 && (
              <Pagination
                page={page}
                total={totalPages}
                onChange={setPage}
              />
            )}

          </div>

        </div>

        {/* Back Button with Updated Gradient */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#2596be] to-[#122E34] text-white px-10 py-4 rounded-2xl font-bold hover:shadow-2xl hover:scale-[1.03] hover:opacity-90 transition-all duration-400 overflow-hidden"
          >
            {/* Shine effect */}
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            
            <svg className="w-5 h-5 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="relative">Back to Home</span>
          </Link>
        </div>

      </div>

    </div>
  );
}