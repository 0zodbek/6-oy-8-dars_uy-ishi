import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function Home() {
  const [products, setProduct] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  // const [selectCategory, setSelectCategory] = useState("all");

  async function GetData(url) {
    try {
      const response = await fetch(url);
      let data = [];
      if (response.status == 200) {
        data = await response.json();
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetData("https://cars-pagination.onrender.com/products")
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Navigate = useNavigate();
  function handleClick(event) {
    Navigate(`/product/${event}`);
  }

  useEffect(() => {
    GetData("https://cars-pagination.onrender.com/products")
      .then((data) => {
        setProduct(data);
        setFilterProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSelect(event) {
    if (event.target.value === "all") {
      setFilterProducts(products);
    } else {
      const filter = products.filter(
        (product) => product.category === event.target.value
      );
      setFilterProducts(filter);
    }
  }

  return (
    <div className={styles.container}>
      <header>
        <h2>Products</h2>

        <select className={styles.select} onChange={handleSelect}>
          <option value="all">Kategory</option>
          <option value="не популярен">не популярен</option>
          <option value="известный">известный</option>
          <option value="средний">средний</option>
        </select>
      </header>

      <div className={styles.cardWrapper}>
        {filterProducts.length > 0 &&
          filterProducts.map(function (product, index) {
            return (
              <div
                key={index}
                onClick={() => handleClick(product.id)}
                className={styles.card}
              >
                <div><img className={styles.cardImg} src={product.image} alt="picture" /></div>
                <h3>{product.name}</h3>
                <p className={styles.popularity}>{product.category}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
