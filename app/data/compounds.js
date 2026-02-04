export const COMPOUNDS = {
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
export const getProductDetails = (slug) => {
  const productMap = {
    // Ajanta Pharma Products
    "kamagra-gold-50-mg": { name: "Kamagra Gold 50mg", price: 15.99, rating: 4.8, stock: 45 },
    "kamagra-gold-100-mg": { name: "Kamagra Gold 100mg", price: 22.99, rating: 4.9, stock: 32 },
    "kamagra-100mg-oral-jelly-vol1": { name: "Kamagra 100mg Oral Jelly", price: 25.99, rating: 4.7, stock: 28 },
    
    // Centurion Remedies Products
    "cenforce-100mg": { name: "Cenforce 100mg", price: 18.99, rating: 4.8, stock: 50 },
    "vidalista-20mg": { name: "Vidalista 20mg", price: 32.99, rating: 4.9, stock: 25 },
    
    // Sunrise Remedies Products
    "malegra-100": { name: "Malegra 100mg", price: 16.99, rating: 4.7, stock: 40 },
    "tadarise-20": { name: "Tadarise 20mg", price: 28.99, rating: 4.8, stock: 30 },
    "super-p-force": { name: "Super P-Force", price: 42.99, rating: 4.9, stock: 20 },
    
    // Default fallback
    "default": { name: slug, price: 19.99, rating: 4.5, stock: 10 }
  };
  
  return productMap[slug] || productMap.default;
};

// Get all manufacturers
export const getManufacturers = () => Object.keys(COMPOUNDS);

// Get compounds by manufacturer
export const getCompoundsByManufacturer = (manufacturer) => COMPOUNDS[manufacturer] || {};

// Get all products
export const getAllProducts = () => {
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