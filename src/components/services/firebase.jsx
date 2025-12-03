// src/services/firebase.js
import { getFirestore, collection, getDocs, doc, getDoc, query, where, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4fIO901i2SDSc8r-MIWwlrGT-RgP3b6s",
  authDomain: "coder-lex-81710.firebaseapp.com",
  projectId: "coder-lex-81710",
  storageBucket: "coder-lex-81710.firebasestorage.app",
  messagingSenderId: "269916809520",
  appId: "1:269916809520:web:8778bc7ed2f1e7693c80f5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener productos desde Firestore
export const getProductsFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    console.log(`Número de productos encontrados: ${querySnapshot.size}`);

    const productos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Productos obtenidos desde Firestore:", productos);
    return productos;
  } catch (error) {
    console.error("Error al obtener productos desde Firestore:", error);
    return [];
  }
};

// Obtener productos por categoría desde Firestore
export const getProductsByCategory = async (categoryId) => {
  try {
    // Crear una consulta para filtrar por categoría
    const q = query(collection(db, "productos"), where("category", "==", categoryId));

    const querySnapshot = await getDocs(q);
    const productos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return productos;
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    return [];
  }
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  console.log(`Buscando producto con ID: ${id}`);
  try {
    const docRef = doc(db, "productos", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      console.log("Producto encontrado:", docSnapshot.data());
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      console.log("Producto no encontrado");
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw new Error("Producto no encontrado"); // Se puede hacer un redireccionamiento aquí
    // Por ejemplo, redirigir al listado de productos:
    // history.push('/'); // Si usas React Router
  }
};
// Agregar una orden a Firebase
export const addOrderToFirestore = async (orderDetails) => {
  try {
    const orderRef = await addDoc(collection(db, "orders"), orderDetails);
    return orderRef.id;  // Devuelve el ID de la orden creada
  } catch (error) {
    console.error("Error al crear la orden: ", error);
    throw error;
  }
};

export { db };