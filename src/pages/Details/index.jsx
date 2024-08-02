import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function Product() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://cars-pagination.onrender.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [id]);

  function handleCanel() {
    navigate("/");
  }

  return (
    <div className={styles.detailsCard}>
      <img className={styles.img} src={product.image} alt="picture" />
      <div className={styles.info}>
        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.comment}>comments({product.comments})</p>
        <span>
          <p className={styles.newPrice}>{product.newPrice / 1000}₽</p>
          <p className={styles.oldPrice}>{product.oldPrice / 1000}₽</p>
        </span>
        <h3> Category:{product.category}</h3>
      </div>
      <button className={styles.btn} onClick={handleCanel}>
        Back
      </button>
    </div>
  );
}

export default Product;
