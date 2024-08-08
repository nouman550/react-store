import React, { useState, useEffect } from 'react';
import DiscoverMenuProduct from './DiscoverMenuProduct';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DiscoverMenu = () => {
  const [products, setProducts] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [preOrderState, setPreOrderState] = useState(false);
  const [oneTime, setOneTime] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/restaurants/6/items?ids=670,669,667,668`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      )
      .then((res) => {
        let cat = res.data;
        return cat;
      })
      .then((cat) => {
        setProducts(cat);
      })
      .catch((err) => {
        console.log(err);
      });
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
        setIsActive(response.is_active);
        setPreOrderState(response.accept_pre_order);
        setIsOpen(response.is_open);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [oneTime]);

  return (
    <div>
      <div className="mad-section discover-menu">
        <h2 className="mad-page-title align-center">A déguster</h2>
        <div
          data-isotope-layout="grid"
          data-isotope-filter="#portfolio-filter"
          className="mad-products item-col-4 mad-grid--isotope "
        >
          {Object.keys(products).length > 0 &&
            Object.entries(products).map((product, i) => (
              <DiscoverMenuProduct
                key={product[1].item_id}
                product={product}
                index={i}
                disabled={!isOpen}
                preOrderState={preOrderState}
              />
            ))}
        </div>
        <div className="align-center">
          <Link to="./menu" className="btn btn-style-2 btn-big">
            Voir la carte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiscoverMenu;
