'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// COMPOUNDS DATA - Moved to same file
const COMPOUNDS = {
  "Ajanta Pharma": {
    Sildenafil: [
      "kamagra-gold-50-mg",
      "kamagra-gold-100-mg",
      "kamagra-100mg-oral-jelly-vol1",
      "super-kamagra-oral-jelly",
      "kamagra-polo",
      "kamagra-100mg-chewable-strawberry",
      "kamagra-100mg-chewable-orange",
      "kamagra-100mg-effervescent",
      "kamagra-expo-100mg",
      "lovegra-100mg-oral-jelly",
      "lovegra-100mg",
    ],
    "Vardenafil": [
      "valif-20mg-tablet",
      "valif-20mg-oral-jelly",
    ],
    "Sildenafil & Depoxetine": [
      "super-kamagra-oral-jelly",
      "super-kamagra",
    ],
    Tadalafil: [
      "apcalis-sx-20mg-oral-jelly",
      "tadalis-sx-20mg",
      "vidalista-2-5-mg",
      "vidalista-10-mg"
    ],
  },

  "Centurion Remedies": {
    Sildenafil: [
      "cenforce-25mg",
      "cenforce-50mg",
      "cenforce-100mg",
      "cenforce-120mg",
      "cenforce-130mg",
      "cenforce-150mg",
      "cenforce-200mg",
      "cenforce-soft-100",
      "cenforce-fm-100",
      "cenforce-professional",
      "cenforce-oral-jelly-100",
    ],
    "Sildenafil & Depoxetine": [
      "cenforce-d-100-60",
    ],
    "Tadalafil & Dapoxetine": [
      "super-vidalista",
    ],
    "Vardenafil": [
      "vilitra-10mg",
      "vilitra-20mg",
      "vilitra-40mg",
      "vilitra-60",
    ],
    "Vardenafil & Dapoxetine": [
      "super-vilitra",
    ],
    "Flibanserin": [
      "fliban-100",
    ],
    Tadalafil: [
      "vidalista-2-5mg",
      "vidalista-5",
      "vidalista-10",
      "vidalista-20mg",
      "vidalista-40",
      "vidalista-60mg",
      "vidalista-80",
      "vidalista-black-80mg",
      "vidalista-ct-20mg",
      "vidalista-professional",
      "vidalista-5-mg"
    ],
  },

  "Sunrise Remedies": {
    Avanafil: [
      "avana-50mg",
      "avana-100",
      "avana-200",
    ],
    "Sildenafil & Duloxetine": [
      "malegra-dxt",
      "malegra-dxt-plus",
    ],
    "Sildenafil & Fluoxetine": [
      "malegra-fxt",
      "malegra-fxt-plus",
    ],
    "Sildenafil": [
      "p-force-100-caps",
      "p-force-fort",
      "p-force-plus",
      "extra-super-p-force",
      "sildisoft-100",
      "sildisoft-50",
      "malegra-25",
      "malegra-50",
      "malegra-75",
      "malegra-100",
      "malegra-120",
      "malegra-200",
      "malegra100-oral-jelly",
      "malegra-pro-50",
      "malegra-pro-100",
      "malegra100-green",
      "malegra100-gold",
      "chocogra-100",
    ],
    "Sildenafil Effervescent": [
      "malegra-effervescent100mg",
    ],
    "Cream": [
      "penon-cream",
      "naron-cream",
      "grafix-cream",
      "femallegra-100",
    ],
    "Sildenafil & Dapoxetine": [
      "super-p-force-oral-jelly",
      "super-p-force",
    ],
    "Tadalafil": [
      "tadarise-2-5",
      "tadarise-5",
      "tadarise-10",
      "tadarise-pro-20",
      "tadarise-20",
      "tadarise-20-oral-jelly",
      "tadarise-40",
      "tadarise-pro-40",
      "tadarise-60",
      "tadarise-effervescent",
      "tadasoft-20",
      "tadasoft-40",
      "tadafem-20",
      "clofi-25",
      "chocolis-20",
    ],
    "Clomiphene": [
      "clofi-50",
      "clofi-100",
    ],
    "Udenafil": [
      "zudena-100",
      "zudena-200",
    ],
    "Udenafil & Dapoxetine": [
      "super-zudena",
    ],
    "Ivermectin": [
      "iversun-6",
      "iversun-12",
    ],
    "Cinacalcet": [
      "cinasun-30",
      "cinasun-60",
      "cinasun-90",
    ],
    "Tadalafil & Dapoxetine": [
      "super-tadarise",
      "extra-super-tadarise",
      "top-tadarise"
    ],
    "Dapoxetine": [
      "poxet-30",
      "poxet-60",
      "poxet-90",
    ],
    "Avanafil & Dapoxetine": [
      "top-avana",
      "super-avana",
      "extra-super-avana",
    ],
    "Vardenafil": [
      "zhewitra-10",
      "zhewitra-20",
      "zhewitra-20-oral-jelly",
      "zhewitra-40",
      "zhewitra-60",
      "zhewitra-soft-20"
    ],
    "Vardenafil & Dapoxetine": [
      "super-zhewitra",
      "extra-super-zhewitra",
    ],
    "Orlistat": [
      "orlisun",
    ],
    "Modafinil": [
      "modafresh-200",
    ],
    "Pirfenidone": [
      "pirfisun-tablet"
    ]
  },
};

// Helper function to get product details
const getProductDetails = (slug) => {
  const productMap = {
    // Ajanta Pharma Products
    "kamagra-gold-50-mg": { name: "Kamagra Gold 50mg", price: 15.99, rating: 4.8, stock: 45 },
    "kamagra-gold-100-mg": { name: "Kamagra Gold 100mg", price: 22.99, rating: 4.9, stock: 32 },
    "kamagra-100mg-oral-jelly-vol1": { name: "Kamagra 100mg Oral Jelly", price: 25.99, rating: 4.7, stock: 28 },
    "super-kamagra-oral-jelly": { name: "Super Kamagra Oral Jelly", price: 28.99, rating: 4.8, stock: 25 },
    "kamagra-polo": { name: "Kamagra Polo", price: 18.99, rating: 4.6, stock: 40 },
    "kamagra-100mg-chewable-strawberry": { name: "Kamagra Chewable Strawberry 100mg", price: 20.99, rating: 4.5, stock: 35 },
    "kamagra-100mg-chewable-orange": { name: "Kamagra Chewable Orange 100mg", price: 20.99, rating: 4.5, stock: 35 },
    "kamagra-100mg-effervescent": { name: "Kamagra Effervescent 100mg", price: 22.99, rating: 4.7, stock: 30 },
    "kamagra-expo-100mg": { name: "Kamagra Expo 100mg", price: 24.99, rating: 4.8, stock: 28 },
    "lovegra-100mg-oral-jelly": { name: "Lovegra Oral Jelly 100mg", price: 26.99, rating: 4.9, stock: 22 },
    "lovegra-100mg": { name: "Lovegra 100mg", price: 23.99, rating: 4.7, stock: 30 },
    "valif-20mg-tablet": { name: "Valif 20mg Tablet", price: 31.99, rating: 4.8, stock: 20 },
    "valif-20mg-oral-jelly": { name: "Valif Oral Jelly 20mg", price: 33.99, rating: 4.9, stock: 18 },
    "super-kamagra": { name: "Super Kamagra", price: 29.99, rating: 4.8, stock: 25 },
    "apcalis-sx-20mg-oral-jelly": { name: "Apcalis SX Oral Jelly 20mg", price: 34.99, rating: 4.9, stock: 15 },
    "tadalis-sx-20mg": { name: "Tadalis SX 20mg", price: 29.99, rating: 4.7, stock: 22 },
    "vidalista-2-5-mg": { name: "Vidalista 2.5mg", price: 12.99, rating: 4.5, stock: 50 },
    "vidalista-10-mg": { name: "Vidalista 10mg", price: 18.99, rating: 4.7, stock: 40 },
    
    // Centurion Remedies Products
    "cenforce-25mg": { name: "Cenforce 25mg", price: 8.99, rating: 4.3, stock: 60 },
    "cenforce-50mg": { name: "Cenforce 50mg", price: 12.99, rating: 4.5, stock: 55 },
    "cenforce-100mg": { name: "Cenforce 100mg", price: 18.99, rating: 4.8, stock: 50 },
    "cenforce-120mg": { name: "Cenforce 120mg", price: 21.99, rating: 4.8, stock: 35 },
    "cenforce-130mg": { name: "Cenforce 130mg", price: 23.99, rating: 4.9, stock: 30 },
    "cenforce-150mg": { name: "Cenforce 150mg", price: 25.99, rating: 4.9, stock: 28 },
    "cenforce-200mg": { name: "Cenforce 200mg", price: 29.99, rating: 4.9, stock: 25 },
    "cenforce-soft-100": { name: "Cenforce Soft 100mg", price: 20.99, rating: 4.7, stock: 40 },
    "cenforce-fm-100": { name: "Cenforce FM 100mg", price: 26.99, rating: 4.8, stock: 32 },
    "cenforce-professional": { name: "Cenforce Professional", price: 22.99, rating: 4.7, stock: 35 },
    "cenforce-oral-jelly-100": { name: "Cenforce Oral Jelly 100mg", price: 24.99, rating: 4.8, stock: 30 },
    "cenforce-d-100-60": { name: "Cenforce D 100/60mg", price: 32.99, rating: 4.9, stock: 20 },
    "super-vidalista": { name: "Super Vidalista", price: 38.99, rating: 4.9, stock: 18 },
    "vilitra-10mg": { name: "Vilitra 10mg", price: 21.99, rating: 4.6, stock: 40 },
    "vilitra-20mg": { name: "Vilitra 20mg", price: 28.99, rating: 4.8, stock: 30 },
    "vilitra-40mg": { name: "Vilitra 40mg", price: 34.99, rating: 4.9, stock: 22 },
    "vilitra-60": { name: "Vilitra 60mg", price: 39.99, rating: 4.9, stock: 18 },
    "super-vilitra": { name: "Super Vilitra", price: 42.99, rating: 4.9, stock: 15 },
    "fliban-100": { name: "Fliban 100mg", price: 45.99, rating: 4.7, stock: 25 },
    "vidalista-2-5mg": { name: "Vidalista 2.5mg", price: 12.99, rating: 4.5, stock: 50 },
    "vidalista-5": { name: "Vidalista 5mg", price: 15.99, rating: 4.6, stock: 45 },
    "vidalista-10": { name: "Vidalista 10mg", price: 18.99, rating: 4.7, stock: 40 },
    "vidalista-20mg": { name: "Vidalista 20mg", price: 32.99, rating: 4.9, stock: 25 },
    "vidalista-40": { name: "Vidalista 40mg", price: 42.99, rating: 4.9, stock: 20 },
    "vidalista-60mg": { name: "Vidalista 60mg", price: 48.99, rating: 4.9, stock: 18 },
    "vidalista-80": { name: "Vidalista 80mg", price: 54.99, rating: 4.9, stock: 15 },
    "vidalista-black-80mg": { name: "Vidalista Black 80mg", price: 58.99, rating: 4.9, stock: 12 },
    "vidalista-ct-20mg": { name: "Vidalista CT 20mg", price: 34.99, rating: 4.8, stock: 25 },
    "vidalista-professional": { name: "Vidalista Professional", price: 36.99, rating: 4.8, stock: 22 },
    "vidalista-5-mg": { name: "Vidalista 5mg", price: 15.99, rating: 4.6, stock: 45 },
    
    // Sunrise Remedies Products
    "avana-50mg": { name: "Avana 50mg", price: 38.99, rating: 4.8, stock: 25 },
    "avana-100": { name: "Avana 100mg", price: 45.99, rating: 4.9, stock: 20 },
    "avana-200": { name: "Avana 200mg", price: 52.99, rating: 4.9, stock: 18 },
    "malegra-dxt": { name: "Malegra DXT", price: 28.99, rating: 4.7, stock: 30 },
    "malegra-dxt-plus": { name: "Malegra DXT Plus", price: 32.99, rating: 4.8, stock: 25 },
    "malegra-fxt": { name: "Malegra FXT", price: 26.99, rating: 4.6, stock: 35 },
    "malegra-fxt-plus": { name: "Malegra FXT Plus", price: 30.99, rating: 4.7, stock: 28 },
    "p-force-100-caps": { name: "P Force 100mg Capsules", price: 22.99, rating: 4.7, stock: 35 },
    "p-force-fort": { name: "P Force Fort", price: 26.99, rating: 4.8, stock: 30 },
    "p-force-plus": { name: "P Force Plus", price: 34.99, rating: 4.9, stock: 22 },
    "extra-super-p-force": { name: "Extra Super P-Force", price: 42.99, rating: 4.9, stock: 18 },
    "sildisoft-100": { name: "Sildisoft 100mg", price: 16.99, rating: 4.5, stock: 45 },
    "sildisoft-50": { name: "Sildisoft 50mg", price: 12.99, rating: 4.4, stock: 50 },
    "malegra-25": { name: "Malegra 25mg", price: 8.99, rating: 4.2, stock: 60 },
    "malegra-50": { name: "Malegra 50mg", price: 12.99, rating: 4.5, stock: 55 },
    "malegra-75": { name: "Malegra 75mg", price: 15.99, rating: 4.6, stock: 45 },
    "malegra-100": { name: "Malegra 100mg", price: 16.99, rating: 4.7, stock: 40 },
    "malegra-120": { name: "Malegra 120mg", price: 19.99, rating: 4.7, stock: 35 },
    "malegra-200": { name: "Malegra 200mg", price: 22.99, rating: 4.8, stock: 30 },
    "malegra100-oral-jelly": { name: "Malegra Oral Jelly 100mg", price: 21.99, rating: 4.8, stock: 32 },
    "malegra-pro-50": { name: "Malegra Pro 50mg", price: 14.99, rating: 4.6, stock: 45 },
    "malegra-pro-100": { name: "Malegra Pro 100mg", price: 18.99, rating: 4.7, stock: 38 },
    "malegra100-green": { name: "Malegra 100 Green", price: 17.99, rating: 4.7, stock: 40 },
    "malegra100-gold": { name: "Malegra 100 Gold", price: 19.99, rating: 4.8, stock: 35 },
    "chocogra-100": { name: "Chocogra 100mg", price: 20.99, rating: 4.7, stock: 30 },
    "malegra-effervescent100mg": { name: "Malegra Effervescent 100mg", price: 24.99, rating: 4.8, stock: 28 },
    "penon-cream": { name: "Penon Cream", price: 29.99, rating: 4.6, stock: 40 },
    "naron-cream": { name: "Naron Cream", price: 26.99, rating: 4.5, stock: 45 },
    "grafix-cream": { name: "Grafix Cream", price: 32.99, rating: 4.7, stock: 35 },
    "femallegra-100": { name: "Femallegra 100mg", price: 34.99, rating: 4.8, stock: 30 },
    "super-p-force-oral-jelly": { name: "Super P-Force Oral Jelly", price: 44.99, rating: 4.9, stock: 20 },
    "super-p-force": { name: "Super P-Force", price: 42.99, rating: 4.9, stock: 20 },
    "tadarise-2-5": { name: "Tadarise 2.5mg", price: 10.99, rating: 4.4, stock: 55 },
    "tadarise-5": { name: "Tadarise 5mg", price: 13.99, rating: 4.6, stock: 50 },
    "tadarise-10": { name: "Tadarise 10mg", price: 16.99, rating: 4.7, stock: 45 },
    "tadarise-pro-20": { name: "Tadarise Pro 20mg", price: 28.99, rating: 4.8, stock: 30 },
    "tadarise-20": { name: "Tadarise 20mg", price: 28.99, rating: 4.8, stock: 30 },
    "tadarise-20-oral-jelly": { name: "Tadarise Oral Jelly 20mg", price: 31.99, rating: 4.9, stock: 25 },
    "tadarise-40": { name: "Tadarise 40mg", price: 38.99, rating: 4.9, stock: 22 },
    "tadarise-pro-40": { name: "Tadarise Pro 40mg", price: 40.99, rating: 4.9, stock: 20 },
    "tadarise-60": { name: "Tadarise 60mg", price: 44.99, rating: 4.9, stock: 18 },
    "tadarise-effervescent": { name: "Tadarise Effervescent", price: 34.99, rating: 4.8, stock: 25 },
    "tadasoft-20": { name: "Tadasoft 20mg", price: 26.99, rating: 4.7, stock: 35 },
    "tadasoft-40": { name: "Tadasoft 40mg", price: 36.99, rating: 4.8, stock: 28 },
    "tadafem-20": { name: "Tadafem 20mg", price: 29.99, rating: 4.7, stock: 30 },
    "clofi-25": { name: "Clofi 25mg", price: 18.99, rating: 4.6, stock: 40 },
    "chocolis-20": { name: "Chocolis 20mg", price: 32.99, rating: 4.8, stock: 25 },
    "clofi-50": { name: "Clofi 50mg", price: 22.99, rating: 4.7, stock: 35 },
    "clofi-100": { name: "Clofi 100mg", price: 28.99, rating: 4.8, stock: 30 },
    "zudena-100": { name: "Zudena 100mg", price: 41.99, rating: 4.8, stock: 22 },
    "zudena-200": { name: "Zudena 200mg", price: 48.99, rating: 4.9, stock: 18 },
    "super-zudena": { name: "Super Zudena", price: 54.99, rating: 4.9, stock: 15 },
    "iversun-6": { name: "Iversun 6mg", price: 12.99, rating: 4.5, stock: 60 },
    "iversun-12": { name: "Iversun 12mg", price: 19.99, rating: 4.6, stock: 50 },
    "cinasun-30": { name: "Cinasun 30mg", price: 42.99, rating: 4.7, stock: 25 },
    "cinasun-60": { name: "Cinasun 60mg", price: 56.99, rating: 4.8, stock: 20 },
    "cinasun-90": { name: "Cinasun 90mg", price: 68.99, rating: 4.8, stock: 15 },
    "super-tadarise": { name: "Super Tadarise", price: 46.99, rating: 4.9, stock: 20 },
    "extra-super-tadarise": { name: "Extra Super Tadarise", price: 52.99, rating: 4.9, stock: 18 },
    "top-tadarise": { name: "Top Tadarise", price: 58.99, rating: 4.9, stock: 15 },
    "poxet-30": { name: "Poxet 30mg", price: 24.99, rating: 4.7, stock: 35 },
    "poxet-60": { name: "Poxet 60mg", price: 34.99, rating: 4.8, stock: 28 },
    "poxet-90": { name: "Poxet 90mg", price: 42.99, rating: 4.9, stock: 22 },
    "top-avana": { name: "Top Avana", price: 62.99, rating: 4.9, stock: 15 },
    "super-avana": { name: "Super Avana", price: 58.99, rating: 4.9, stock: 18 },
    "extra-super-avana": { name: "Extra Super Avana", price: 64.99, rating: 4.9, stock: 12 },
    "zhewitra-10": { name: "Zhewitra 10mg", price: 24.99, rating: 4.7, stock: 35 },
    "zhewitra-20": { name: "Zhewitra 20mg", price: 31.99, rating: 4.8, stock: 30 },
    "zhewitra-20-oral-jelly": { name: "Zhewitra Oral Jelly 20mg", price: 36.99, rating: 4.9, stock: 25 },
    "zhewitra-40": { name: "Zhewitra 40mg", price: 41.99, rating: 4.9, stock: 22 },
    "zhewitra-60": { name: "Zhewitra 60mg", price: 48.99, rating: 4.9, stock: 18 },
    "zhewitra-soft-20": { name: "Zhewitra Soft 20mg", price: 34.99, rating: 4.8, stock: 28 },
    "super-zhewitra": { name: "Super Zhewitra", price: 52.99, rating: 4.9, stock: 20 },
    "extra-super-zhewitra": { name: "Extra Super Zhewitra", price: 58.99, rating: 4.9, stock: 15 },
    "orlisun": { name: "Orlisun", price: 38.99, rating: 4.6, stock: 40 },
    "modafresh-200": { name: "Modafresh 200mg", price: 45.99, rating: 4.7, stock: 30 },
    "pirfisun-tablet": { name: "Pirfisun Tablet", price: 82.99, rating: 4.8, stock: 20 },
    
    // Default fallback
    "default": { name: "Generic Product", price: 19.99, rating: 4.5, stock: 10 }
  };
  
  return productMap[slug] || productMap.default;
};

// Get all manufacturers
const getManufacturers = () => Object.keys(COMPOUNDS);

// Get all products
const getAllProducts = () => {
  const allProducts = [];
  Object.entries(COMPOUNDS).forEach(([manufacturer, compounds]) => {
    Object.entries(compounds).forEach(([compound, products]) => {
      products.forEach(slug => {
        const details = getProductDetails(slug);
        allProducts.push({
          slug,
          name: details.name,
          manufacturer,
          compound,
          price: details.price,
          rating: details.rating,
          stock: details.stock
        });
      });
    });
  });
  return allProducts;
};

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    console.log(`Added ${quantity} ${product.name} to cart`);
    
    setTimeout(() => {
      alert(`Added ${quantity} ${product.name} to cart!`);
      setIsAdding(false);
    }, 500);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#ABAFB5]/30 hover:shadow-xl transition-all duration-300 group flex flex-col h-full hover:border-[#2596be]/30">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#2596be]/5 to-[#122E34]/5 flex-shrink-0">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-4xl text-[#2596be] group-hover:scale-110 transition-transform duration-300">
            💊
          </div>
        </div>
        
        <div className="absolute top-4 right-4">
          <span className={`text-xs font-semibold px-2 py-1 rounded ${
            product.stock > 20 
              ? 'bg-[#122E34]/10 text-[#122E34] border border-[#122E34]/20' 
              : 'bg-[#2596be]/10 text-[#2596be] border border-[#2596be]/20'
          }`}>
            {product.stock > 20 ? 'In Stock' : `Only ${product.stock} left`}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4">
          <span className="text-xs font-semibold text-[#0E1D21] bg-white/80 backdrop-blur-sm px-2 py-1 rounded border border-[#ABAFB5]/30">
            {product.manufacturer}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#2596be] bg-[#2596be]/10 px-2 py-1 rounded border border-[#2596be]/20">
            {product.compound}
          </span>
          <span className="text-xs text-[#677E8A]">ID: {product.slug}</span>
        </div>
        
        <h3 className="text-lg font-bold text-[#0E1D21] mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-[#677E8A] text-sm mb-4 line-clamp-2 flex-grow">
          {product.compound} medication for erectile dysfunction
        </p>
        
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-[#ABAFB5]'}>
                ★
              </span>
            ))}
          </div>
          <span className="ml-2 text-sm text-[#122E34]">({product.rating})</span>
          <span className="ml-2 text-sm text-[#677E8A]">• {Math.floor(Math.random() * 100) + 50} reviews</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-[#2596be]">${product.price.toFixed(2)}</span>
              <span className="text-sm text-[#677E8A] ml-2">per strip</span>
            </div>
            
            <div className="flex items-center border border-[#ABAFB5] rounded-lg">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-1 text-[#0E1D21] hover:bg-[#ABAFB5]/10 disabled:opacity-50"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-3 py-1 border-x border-[#ABAFB5] min-w-[40px] text-center text-[#0E1D21]">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-1 text-[#0E1D21] hover:bg-[#ABAFB5]/10"
              >
                +
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full px-4 py-3 bg-gradient-to-r from-[#122E34] to-[#2596be] hover:from-[#0E1D21] hover:to-[#1a7a9a] text-white rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <span className="mr-2">🛒</span> Add to Cart
              </>
            )}
          </button>
          
          <div className="mt-4 pt-4 border-t border-[#ABAFB5]/20 flex justify-between">
            <button className="text-sm text-[#2596be] hover:text-[#1a7a9a] font-medium flex items-center">
              <span className="mr-1">💖</span> Wishlist
            </button>
            <button className="text-sm text-[#677E8A] hover:text-[#122E34] font-medium flex items-center">
              <span className="mr-1">👁️</span> View
            </button>
            <button className="text-sm text-[#122E34] hover:text-[#0E1D21] font-medium flex items-center">
              <span className="mr-1">⚡</span> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManufacturerFilter({ manufacturers, selectedManufacturer, onSelect }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-[#ABAFB5]/30">
      <h3 className="font-bold text-[#0E1D21] mb-4 text-lg">Manufacturers</h3>
      <div className="space-y-2">
        <button
          onClick={() => onSelect('All')}
          className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-200 ${
            selectedManufacturer === 'All' 
              ? 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 text-[#122E34] font-semibold border border-[#2596be]/30' 
              : 'text-[#0E1D21] hover:bg-[#ABAFB5]/10 border border-transparent hover:border-[#ABAFB5]/30'
          }`}
        >
          <div className="flex items-center">
            <span className="mr-2 text-[#2596be]">🏢</span> All Manufacturers
          </div>
        </button>
        {manufacturers.map(manufacturer => (
          <button
            key={manufacturer}
            onClick={() => onSelect(manufacturer)}
            className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-200 flex justify-between items-center ${
              selectedManufacturer === manufacturer 
                ? 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 text-[#122E34] font-semibold border border-[#2596be]/30' 
                : 'text-[#0E1D21] hover:bg-[#ABAFB5]/10 border border-transparent hover:border-[#ABAFB5]/30'
            }`}
          >
            <div className="flex items-center">
              <span className="mr-2 text-[#2596be]">🏭</span>
              <span className="truncate">{manufacturer}</span>
            </div>
            <span className="text-xs bg-[#ABAFB5]/10 text-[#677E8A] px-2 py-1 rounded whitespace-nowrap">
              {Object.keys(COMPOUNDS[manufacturer] || {}).length}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function CompoundFilter({ compounds, selectedCompound, onSelect }) {
  const allCompounds = [...new Set(compounds)];
  
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-[#ABAFB5]/30">
      <h3 className="font-bold text-[#0E1D21] mb-4 text-lg">Compounds</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
        <button
          onClick={() => onSelect('All')}
          className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-200 ${
            selectedCompound === 'All' 
              ? 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 text-[#122E34] font-semibold border border-[#2596be]/30' 
              : 'text-[#0E1D21] hover:bg-[#ABAFB5]/10 border border-transparent hover:border-[#ABAFB5]/30'
          }`}
        >
          <div className="flex items-center">
            <span className="mr-2 text-[#2596be]">🧪</span> All Compounds
          </div>
        </button>
        {allCompounds.map(compound => (
          <button
            key={compound}
            onClick={() => onSelect(compound)}
            className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-200 ${
              selectedCompound === compound 
                ? 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 text-[#122E34] font-semibold border border-[#2596be]/30' 
                : 'text-[#0E1D21] hover:bg-[#ABAFB5]/10 border border-transparent hover:border-[#ABAFB5]/30'
            }`}
          >
            <div className="flex items-center">
              <span className="mr-2 text-[#2596be]">💊</span>
              <span className="truncate">{compound}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pages.push('...');
    }
  }
  
  const uniquePages = pages.filter((page, index) => pages.indexOf(page) === index);
  
  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg bg-[#ABAFB5]/10 text-[#0E1D21] hover:bg-[#ABAFB5]/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Prev
      </button>
      
      {uniquePages.map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-3 py-2 text-[#677E8A]">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg font-medium ${
              currentPage === page
                ? 'bg-gradient-to-r from-[#122E34] to-[#2596be] text-white shadow-md'
                : 'bg-[#ABAFB5]/10 text-[#0E1D21] hover:bg-[#ABAFB5]/20'
            }`}
          >
            {page}
          </button>
        )
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg bg-[#ABAFB5]/10 text-[#0E1D21] hover:bg-[#ABAFB5]/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </div>
  );
}

export default function ProductsPage() {
  const [selectedManufacturer, setSelectedManufacturer] = useState('All');
  const [selectedCompound, setSelectedCompound] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const itemsPerPage = 12;
  
  const manufacturers = getManufacturers();
  const allProducts = getAllProducts();
  
  const allCompounds = [...new Set(allProducts.map(p => p.compound))].sort();
  
  const filteredProducts = allProducts.filter(product => {
    const matchesManufacturer = selectedManufacturer === 'All' || product.manufacturer === selectedManufacturer;
    const matchesCompound = selectedCompound === 'All' || product.compound === selectedCompound;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.compound.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesManufacturer && matchesCompound && matchesPrice && matchesSearch;
  });
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'stock':
        return b.stock - a.stock;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'popular':
      default:
        return b.rating * b.stock - a.rating * a.stock;
    }
  });
  
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedManufacturer, selectedCompound, priceRange, sortBy, searchQuery]);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="px-6 py-3 bg-gradient-to-r from-[#122E34] to-[#2596be] text-white rounded-xl shadow-lg font-semibold flex items-center"
        >
          <span className="mr-2">🔍</span> Filters
        </button>
      </div>
      
      {/* Mobile Filter Overlay */}
      {isMobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="absolute top-0 left-0 h-full w-3/4 max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#0E1D21]">Filters</h2>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-2xl text-[#677E8A] hover:text-[#0E1D21]"
                >
                  ×
                </button>
              </div>
              
              <ManufacturerFilter 
                manufacturers={manufacturers}
                selectedManufacturer={selectedManufacturer}
                onSelect={(man) => {
                  setSelectedManufacturer(man);
                  setIsMobileFiltersOpen(false);
                }}
              />
              
              <CompoundFilter 
                compounds={allCompounds}
                selectedCompound={selectedCompound}
                onSelect={(comp) => {
                  setSelectedCompound(comp);
                  setIsMobileFiltersOpen(false);
                }}
              />
              
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-[#ABAFB5]/30">
                <h3 className="font-bold text-[#0E1D21] mb-4 text-lg">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-[#677E8A]">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full h-2 bg-[#ABAFB5]/20 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-[#ABAFB5]/20 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <button
                onClick={() => {
                  setSelectedManufacturer('All');
                  setSelectedCompound('All');
                  setPriceRange([0, 100]);
                  setSearchQuery('');
                  setIsMobileFiltersOpen(false);
                }}
                className="w-full px-4 py-3 bg-[#ABAFB5]/10 hover:bg-[#ABAFB5]/20 text-[#0E1D21] rounded-xl font-medium transition-colors mb-6"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-8 space-y-6">
              <ManufacturerFilter 
                manufacturers={manufacturers}
                selectedManufacturer={selectedManufacturer}
                onSelect={setSelectedManufacturer}
              />
              
              <CompoundFilter 
                compounds={allCompounds}
                selectedCompound={selectedCompound}
                onSelect={setSelectedCompound}
              />
              
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-[#ABAFB5]/30">
                <h3 className="font-bold text-[#0E1D21] mb-4 text-lg">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-[#677E8A]">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full h-2 bg-[#ABAFB5]/20 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-[#ABAFB5]/20 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <button
                onClick={() => {
                  setSelectedManufacturer('All');
                  setSelectedCompound('All');
                  setPriceRange([0, 100]);
                  setSearchQuery('');
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-[#ABAFB5]/10 to-[#ABAFB5]/20 hover:from-[#ABAFB5]/20 hover:to-[#ABAFB5]/30 text-[#0E1D21] rounded-xl font-medium transition-all shadow-sm"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">🔄</span> Reset All Filters
                </span>
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-[#ABAFB5]/30">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#0E1D21] mb-2">All Products</h2>
                  <p className="text-[#677E8A]">
                    Showing {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} products
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#0E1D21] whitespace-nowrap">Sort by:</span>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-[#ABAFB5] rounded-xl bg-white text-[#0E1D21] focus:outline-none focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20 transition"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="stock">In Stock</option>
                      <option value="name">Name: A to Z</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="lg:hidden px-4 py-2 border border-[#ABAFB5] rounded-xl bg-white text-[#0E1D21] hover:bg-[#ABAFB5]/10 flex items-center"
                  >
                    <span className="mr-2">🔍</span> Filter
                  </button>
                </div>
              </div>
              
              {/* Active Filters */}
              {(selectedManufacturer !== 'All' || selectedCompound !== 'All' || searchQuery) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedManufacturer !== 'All' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 text-[#122E34] border border-[#2596be]/30">
                      Manufacturer: {selectedManufacturer}
                      <button 
                        onClick={() => setSelectedManufacturer('All')} 
                        className="ml-2 text-[#122E34] hover:text-[#0E1D21]"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  {selectedCompound !== 'All' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 text-[#122E34] border border-[#2596be]/30">
                      Compound: {selectedCompound}
                      <button 
                        onClick={() => setSelectedCompound('All')} 
                        className="ml-2 text-[#122E34] hover:text-[#0E1D21]"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#ABAFB5]/10 text-[#677E8A] border border-[#ABAFB5]/30">
                      Search: {searchQuery}
                      <button 
                        onClick={() => setSearchQuery('')} 
                        className="ml-2 text-[#677E8A] hover:text-[#122E34]"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
            
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProducts.map((product, index) => (
                    <ProductCard key={`${product.slug}-${index}`} product={product} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-[#ABAFB5]/30 p-8 text-center">
                <div className="text-6xl mb-4 text-[#677E8A]">🔍</div>
                <h3 className="text-xl font-semibold text-[#0E1D21] mb-2">No products found</h3>
                <p className="text-[#677E8A] mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSelectedManufacturer('All');
                    setSelectedCompound('All');
                    setPriceRange([0, 100]);
                    setSearchQuery('');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#122E34] to-[#2596be] hover:from-[#0E1D21] hover:to-[#1a7a9a] text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div> 
        
        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#122E34] to-[#2596be] hover:from-[#0E1D21] hover:to-[#1a7a9a] text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>←</span> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}