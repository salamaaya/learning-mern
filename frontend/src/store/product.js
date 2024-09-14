import { create } from "zustand";
import EditProduct from "../components/EditProduct";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const error = await res.json();
        return { success: false, message: error.message || "Error creating product." };
      }

      const data = await res.json();

      if (data.success) {
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
      } else {
        return { success: false, message: "Failed to create product." };
      }
    } catch (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  },
  fetchProducts: async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (productId) => {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if(!data.success) return { success: false, message: data.message };
    set(state => ({ products: state.products.filter(product => product._id !== productId) }));
    return { success: true, message: data.message };
  },
  editProduct: async (productId, updatedProduct) => {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    const data = await res.json();
    if(!data.success) return { success: false, message: data.message };
    set((state) => ({ 
      products: state.products.map((product) => (product._id === productId ? data.data : product)),
    }));
    return { success: true, message: data.message };
  }
}));
