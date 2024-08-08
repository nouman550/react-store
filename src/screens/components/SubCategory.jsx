import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";

const SubCategory = ({
  category,
  productId,
  setSelectedSubItemsCallBack,
  preloaderCallBack,
}) => {
  const [subItems, setSubItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/restaurants/6/items/${productId}/sub_categories/${category.subcat_id}/sub_items`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      )
      .then((res) => {
        let items = res.data;
        return items;
      })
      .then((result) => {
        setSubItems(result);
        return result;
      })
      .then(() => {
        preloaderCallBack(false);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div>
      {subItems.length > 0 && (
        <Fragment>
          <h5 id={category.subcat_id}>
            {category.subcategory_name}
            {category.required && "*"}
          </h5>

          {Object.values(subItems).map((item, i) => {
            return category.multiple_options ? (
              <div
                className="form-check mb-2"
                key={item.sub_item_id}
                htmlFor={item.sub_item_id}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id={item.sub_item_id}
                  onClick={() => {
                    setSelectedSubItemsCallBack(
                      category.subcat_id,
                      item.sub_item_id,
                      category.multiple_options,
                      category.custom_options,
                      item.sub_item_name,
                      category.subcategory_name,
                      item.price
                    );
                  }}
                />
                <div className="sub_item_info">
                  <label className="form-check-label">
                    {item.sub_item_name}
                  </label>
                  <span className="extra_price">
                    + {item.price === "" ? "0" : item.price}€
                  </span>
                </div>
              </div>
            ) : (
              <div key={item.sub_item_id} className="form-check  mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name={category.subcat_id}
                  id={item.sub_item_id}
                  onClick={() => {
                    setSelectedSubItemsCallBack(
                      category.subcat_id,
                      item.sub_item_id,
                      category.multiple_options,
                      category.custom_options,
                      item.sub_item_name,
                      category.subcategory_name,
                      item.price
                    );
                  }}
                />
                <div className="sub_item_info">
                  <label className="form-check-label">
                    {item.sub_item_name}
                  </label>
                  <span className="extra_price">
                    + {item.price === "" ? "0" : item.price}€
                  </span>
                </div>
              </div>
            );
          })}
          <br />
        </Fragment>
      )}
    </div>
  );
};

export default SubCategory;
