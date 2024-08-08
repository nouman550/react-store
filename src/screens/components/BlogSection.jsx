import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";
import "moment/locale/fr";

const BlogSection = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`https://blog.sushi-street.com/wp-json/wp/v2/posts?per_page=3`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      })
      .then((res) => {
        let data = res.data;
        return data;
      })
      .then((data) => {
        setArticles(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mad-section mad-section--stretched ">
      <div className="mad-colorizer-bg-color"></div>
      <h2 className="mad-page-title text-center">Nos derniers articles</h2>
      <div className="mad-entities item-col-3 type-3 ">
        {articles &&
          articles.length > 0 &&
          articles.map((article, i) => (
            <div className="mad-col col-md-6 col-lg-4" key={i}>
              <article className="mad-entity">
                <div
                  className="mad-entity-media"
                  style={{
                    backgroundImage: `url("${article.yoast_head_json.og_image[0].url}")`,
                    backgroundPosition: " center center",
                  }}
                ></div>
                <div className="mad-entity-body">
                  <div className="mad-entity-tags">
                    <span>
                      <Moment fromNow locale="fr">
                        {article.date}
                      </Moment>
                    </span>
                  </div>
                  <h5 className="mad-entity-title">
                    <a href={article.link} className="mad-link">
                      {article.title.rendered}
                    </a>
                  </h5>
                  <p>{article.yoast_head_json.description}...</p>
                  <a href={article.link} className="mad-read-more small-size">
                    Lire la suite
                  </a>
                </div>
              </article>
            </div>
          ))}
      </div>
      <div className="align-center" style={{ marginTop: "2rem" }}>
        <a
          className="btn btn-style-3 btn-big"
          href="https://blog.sushi-street.com/"
        >
          Explorer
        </a>
      </div>
    </div>
  );
};

export default BlogSection;
