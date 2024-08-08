import axios from "axios";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import Preloader2 from "../components/Preloader2";
import PreLoader from "../components/Preloader";
import Product from "../components/Product";

import styles from "./styles.module.css";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState();
  const [display, setDisplay] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [oneTime, setOneTime] = useState(true);
  const [preOrderState, setPreOrderState] = useState(true);
  const [searchProducts, setSearchProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [specificCategoryProducts, setSpecificCategoryProducts] = useState([]);
  const [categoryIndex, setcategoryIndex] = useState(0);
  const observerRef = useRef();

  useEffect(() => {
    const container = document.getElementById("container");
    if (container) {
      container.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/restaurants/6`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      })
      .then((res) => {
        let response = res.data;
        return response;
      })
      .then((response) => {
        setIsOpen(response.is_open);
        setPreOrderState(response.accept_pre_order);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [oneTime]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/restaurants/6/categories`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      })
      .then((res) => {
        let cat = res.data;
        return cat;
      })
      .then((cat) => {
        setCategories(cat);
        const startersCategory = cat.find(
          (item) => item.category_name === "Nouveautés"
        );

        setActiveTab(parseInt(startersCategory?.cat_id));
        getSpecificCategoryProducts(startersCategory?.cat_id);

        setDisplay(false);
      })
      .catch((err) => {
        console.log(err);
        setDisplay(false);
      });
  }, []);

  const getProductsByKeyword = (keyword) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/restaurants/6/search/${keyword}?description=false`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      )
      .then((res) => {
        let data = res.data;
        return data;
      })
      .then((data) => {
        setSearchProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getProductsByKeywordNoPreload = (categoryId) => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_API_URL}/restaurants/6/categories/${categoryId}/items`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       let data = res.data;
  //       return data;
  //     })
  //     .then((data) => {
  //       setProducts(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getProductsByCategory = (index) => {
    const currentCategory = categories[index ?? categoryIndex];

    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/restaurants/6/categories/${currentCategory?.cat_id}/items`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      )
      .then((res) => {
        let data = res.data;
        return data;
      })
      .then((data) => {
        setCategoryProducts((prev) => [
          ...prev,
          { category: currentCategory.category_name, products: data },
        ]);
        setDisplay(false);
        setcategoryIndex(categoryIndex + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setDisplay(false);
      });
  };

  const getSpecificCategoryProducts = (id) => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/restaurants/6/categories/${id}/items`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      )
      .then((res) => {
        let data = res.data;
        return data;
      })
      .then((data) => {
        setSpecificCategoryProducts(data);
        setDisplay(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setDisplay(false);
      });
  };

  // useEffect(() => {
  //   if (categories.length > 0) {
  //     console.log(categories, "lenght greater");
  //     getProductsByCategory();
  //   }
  // }, [categories]);

  // Intersection Observer callback
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        categories.length > 0 &&
        categoryIndex < categories.length &&
        activeTab === "all" &&
        !searchKeyword
      ) {
        getProductsByCategory();
      }
    },
    [categoryIndex, categories.length]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };
    observerRef.current = new IntersectionObserver(handleObserver, options);

    if (observerRef.current) {
      observerRef.current.observe(document.querySelector("#load-more"));
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Menu Sushi Street</title>
        <meta
          name="description"
          content="Découvrez notre carte et vivez le vrai gout Asiatique avec Sushi Street. Les précommandes sont disponible pour livraison ou à emporter. "
        />
      </Helmet>
      <Preloader2 display={`${display === true ? "d-block" : "d-none"}`} />

      <div className="mad-breadcrumb with-bg-image bg-menu">
        <div className="container">
          <h1 className="mad-page-title">Menu</h1>
        </div>
        <div className="block-bg-overlay style-color-wayh-bg" />
      </div>

      <div className="product-sort-section pt-32">
        <div className="mad-col">
          <nav className="mad-filter-wrap">
            <ul
              id="portfolio-filter"
              className="mad-filter justify-content-center"
            >
              {/* <li
                className={`nav-item ${
                  activeTab === "all" ? "mad-active" : ""
                }`}
                onClick={() => {
                  setActiveTab("all");
                }}
              >
                <a href="#">Toutes Catégories</a>
              </li> */}

              {Object.keys(categories).length > 0 &&
                Object.entries(categories).map((category, i) => (
                  <li
                    className={`nav-item ${
                      activeTab === parseInt(category[1].cat_id)
                        ? "mad-active"
                        : ""
                    }`}
                    key={category[1].cat_id}
                    onClick={() => {
                      getSpecificCategoryProducts(category[1].cat_id);
                      setActiveTab(parseInt(category[1].cat_id));
                    }}
                  >
                    <a href="#">{category[1].category_name}</a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="mad-widget search-box">
        <form className="one-line type-2 size-2">
          <input
            type="text"
            placeholder="Recherche de produits"
            onChange={(e) => {
              if (e.target.value.length > 3) {
                getProductsByKeyword(e.target.value);
              }
              // if (e.target.value.length === 0) {
              //   getProductsByKeywordNoPreload(31);
              // }
              setSearchKeyword(e.target.value);
            }}
          />
          <span className="btn btn-style-3">
            <i className="material-icons">search</i>
          </span>
        </form>
      </div>

      {searchKeyword ? (
        <div className={`container  ${styles.cMaxWidth}`}>
          <div
            data-isotope-layout="grid"
            data-isotope-filter="#portfolio-filter"
            className="mad-products item-col-3  pt-32 mt-32 pb-32 mb-32"
          >
            {Object.entries(searchProducts).map((product, i) => (
              <Product
                key={product.item_id}
                product={product}
                disabled={!isOpen}
                preOrderState={preOrderState}
              />
            ))}
          </div>
        </div>
      ) : activeTab !== "all" ? (
        <div className={`container  ${styles.cMaxWidth}`}>
          <div
            data-isotope-layout="grid"
            data-isotope-filter="#portfolio-filter"
            className="mad-products item-col-3  pt-32 mt-32 pb-32 mb-32"
          >
            {Object.entries(specificCategoryProducts).map((product, i) => (
              <Product
                key={product.item_id}
                product={product}
                disabled={!isOpen}
                preOrderState={preOrderState}
              />
            ))}
          </div>
        </div>
      ) : (
        Object.keys(categoryProducts).length > 0 &&
        categoryProducts.map((catProduct, i) => (
          <Fragment key={i}>
            <div
              style={{
                backgroundColor: i % 2 === 0 ? "#14161" : "#000",
              }}
              className="mad-content"
            >
              <div className={`container  ${styles.cMaxWidth}`}>
                <h1 className={styles.categoryTitle}>{catProduct.category}</h1>
                <div
                  data-isotope-layout="grid"
                  data-isotope-filter="#portfolio-filter"
                  className="mad-products item-col-3 mad-grid--isotope"
                >
                  {Object.entries(catProduct.products).map((product, i) => (
                    <Product
                      key={product[1].item_id}
                      product={product}
                      disabled={!isOpen}
                      preOrderState={preOrderState}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Fragment>
        ))
      )}
      {loading && (
        <div className={styles.spinnerCcontainer}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <div id="load-more" style={{ height: "1px" }} />
      {Object.keys(searchProducts).length === 0 && searchKeyword.length > 0 && (
        <div className="text-center search-alert-box mb-32 pb-32">
          <p className="search-alert-text">
            Aucun produit ne correspond à votre recherche
          </p>
          <div className="d-flex search-alert-img justify-content-center align-items-center">
            <img
              src="images/page-not-found.svg"
              loading="lazy"
              alt="Page Not Found"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
