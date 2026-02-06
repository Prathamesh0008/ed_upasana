// cart-utils.js
export const CART_KEY = 'shoppingCart';

export const addToCart = (product, quantity = 1) => {
  try {
    const currentCart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    
    const existingItemIndex = currentCart.findIndex(item => item.id === product.slug);
    
    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      const cartItem = {
        id: product.slug,
        name: product.name,
        price: product.price,
        quantity: quantity,
        manufacturer: product.manufacturer,
        compound: product.compound,
        stock: product.stock,
        image: '💊',
        requiresPrescription: product.compound.includes('Sildenafil') || 
                             product.compound.includes('Vardenafil') || 
                             product.compound.includes('Tadalafil') ||
                             product.compound.includes('Dapoxetine') ||
                             product.compound.includes('Avanafil')
      };
      currentCart.push(cartItem);
    }
    
    localStorage.setItem(CART_KEY, JSON.stringify(currentCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    return { success: true, cart: currentCart };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, error };
  }
};

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

export const updateCartItem = (id, updates) => {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === id);
  
  if (itemIndex > -1) {
    cart[itemIndex] = { ...cart[itemIndex], ...updates };
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    return cart[itemIndex];
  }
  return null;
};

export const removeFromCart = (id) => {
  const cart = getCart();
  const newCart = cart.filter(item => item.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  window.dispatchEvent(new CustomEvent('cartUpdated'));
  return newCart;
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new CustomEvent('cartUpdated'));
  return [];
};