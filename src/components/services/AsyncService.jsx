const products = [
  {
    id: 1,
    name: 'Body scrub',
    description: 'Aroma todo el día',
    price: 12800,
    category: 'mas-vendidos',
    img: '/img/body-scrub.jpg',
    stock: 10
  },
  {
    id: 2,
    name: 'Crema en barra',
    description: 'Crema para todo tipo de pieles',
    price: 2936,
    category: 'ofertas',
    img: '/img/crema.jpg',
    stock: 15
  },
  {
    id: 3,
    name: 'Jabón',
    description: 'Jabones perfumados, para todo tipo de pieles',
    price: 3698,
    category: 'novedades',
    img: '/img/jabon.jpg',
    stock: 8
  },
  {
    id: 4,
    name: 'Pack para baño',
    description: 'Disfruta de un baño perfumado y natural',
    price: 5820,
    category: 'mas-vendidos',
    img: '/img/jabon-esponjas.jpg',
    stock: 20
  }
];

// Obtener un producto por su ID
export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === parseInt(id)); // Buscar producto por ID
    if (product) {
      resolve(product); // Resolvemos la promesa con el producto
    } else {
      reject("Producto no encontrado"); // Rechazamos la promesa si no encontramos el producto
    }
  });
};

// Obtener todos los productos
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products); // Resolvemos la promesa con todos los productos después de 1 segundo
    }, 1000);
  });
};

// Obtener productos por categoría
export const getProductsByCategory = (categoryId) => {
  return products.filter(product => product.category === categoryId); // Filtramos productos por categoría
};
