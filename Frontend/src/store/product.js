import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    setLoading: (val) => set({ loading: val }),
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
  if (!newProduct.name || !newProduct.image || !newProduct.price) {
    return { success: false, message: "Please fill in all fields." };
  }

  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    body: JSON.stringify(newProduct)
  });

  const data = await res.json();

  set((state) => ({
    products: [...state.products, data.data]
  }));

  return { success: true, message: "Product created successfully" };
},
    fetchProducts: async () => {
  set({ loading: true }); 

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/products`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    set({
      products: data.data || []
    });

  } catch (error) {
    console.log(error);
    set({ products: [] });

  } finally {
    set({ loading: false }); // 👈 ADD THIS LAST
  }
},
    deleteProduct: async (pid) => {
        const res = await fetch(`${API_URL}/api/products/${pid}`, {
  method: "DELETE",
  headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
}
});
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message};

        set(state => ({products: state.products.filter(product => product._id !== pid)}));
        return { success: true, message: data.message };
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`${API_URL}/api/products/${pid}`, {
            method: "PUT",
            headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
},
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message};
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
    
        }));

        return { success: true, message: data.message};
    },
}));

