import React from "react";

const Products = () => {
  return (
    <div className="products">
      <h2>Products</h2>
      <br />
      <table>
        <tr>
          <th>Item Name</th>
          <th>Item Description</th>
          <th>PLU</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>Sample Name</td>
          <td>SAMPLE DESCRIPTION</td>
          <td>1234</td>
          <td>Sample Brand</td>
          <td>Sample Category</td>
          <td>$12.34/lb</td>
        </tr>
      </table>
    </div>
  );
};

export default Products;
