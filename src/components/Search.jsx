import React, { useState, useEffect } from "react";
import { fetchAllBrands, fetchAllCategories, fetchSearchResults } from "../api";

const Search = (props) => {
  const { setIsLoading, setSearchResults } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("All");
  const [category, setCategory] = useState("All");
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    Promise.all([fetchAllBrands(), fetchAllCategories()])

      .then((values) => {
        console.log(values);
        setBrandList(values[0]);
        console.log(brandList);
        setCategoryList(values[1]);
        console.log(categoryList);
      })
      .catch((error) => {
        console.error("Error in useEffect in search", error);
      });
  }, []);

  return (
    <form
      id="search"
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
          fetchSearchResults({ brand, category, searchTerm });
          setSearchResults({ brand, category, searchTerm });
        } catch (err) {
          console.error("Error loading search results", err);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <input
        type="text"
        id="text-search"
        placeholder="search for products"
        value={searchTerm}
        onChange={searchTerm.value}
      />
    </form>
  );
};

export default Search;
