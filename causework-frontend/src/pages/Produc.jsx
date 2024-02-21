import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../styles/Products.css";

function Products() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    qty: "",
    categoryid: "",
  });
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    await getAllCategories();
    await getAllProducts();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8081/get/all/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8081/get/all/category");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/add/product", formData);
      await getAllProducts(); // Refresh products list after adding
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={addProduct}>
        <div className="name">
          <label>Product Name</label>
          <input type="text" name="name" onChange={handleInputChange} value={formData.name} required />
        </div>
        <div className="qty">
          <label>Product QTY</label>
          <input type="text" name="qty" onChange={handleInputChange} value={formData.qty} required />
        </div>
        <div className="price">
          <label>Product Price</label>
          <input type="text" name="price" onChange={handleInputChange} value={formData.price} required />
        </div>
        <select name="categoryid" onChange={handleInputChange} value={formData.categoryid}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Product</button>
      </form>

      <div className="load-all-products">
        <ol>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Products;
