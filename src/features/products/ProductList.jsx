import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setCurrentPage, setSearch } from "./productsSlice";
import { addToCart } from "../cart/cartSlice";
import { useMemo } from "react";

export const ProductList = () => {
  const dispatch = useDispatch();

  // Get required data from Redux
  const { items, status, currentPage, itemsPerPage, search } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  ///filter
  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.title.toLowerCase().includes((search || "").toLowerCase()),
      ),
    [items, search],
  );

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  }

  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };
  // ------------------------

  if (status === "loading") return <p>Loading products...</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={handleSearchChange}
      />
      {/* Product grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "100%", height: "150px", objectFit: "contain" }}
              />
              <h4 style={{ height: "40px", overflow: "hidden" }}>
                {product.title}
              </h4>
              <p>
                <strong>{product.price} $</strong>
              </p>
              <button onClick={() => dispatch(addToCart(product))}>
                Add to cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {/* Page navigation buttons */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            style={{
              padding: "10px 15px",
              backgroundColor: currentPage === number ? "#333" : "#fff",
              color: currentPage === number ? "#fff" : "#333",
              border: "1px solid #333",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};
