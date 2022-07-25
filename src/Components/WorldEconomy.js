import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import styles from "./WorldEconomy.module.css";
import EconomyNewsFeedList from "./EconomyNewsFeedList";
import Loader from "./Loader";

function WorldEconomy() {
  let [feed, setFeed] = useState([]);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);

  async function fetchedNewsHandler() {
    setFeed([]);
    setLoading(true);
    setError(null);
    let endpoint =
      "https://gnews.io/api/v4/search?q=economy&token=8bf54c1726132fb46b390fde828c303a&lang=en";
    try {
      let response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Something Went Wrong.Try again tomorrow");
      }
      let data = await response.json();
      let loadedFeed = [];
      let newsList = data.articles;
      for (let newsLists of newsList) {
        loadedFeed.push({
          time: newsLists.publishedAt,
          id: newsLists.publishedAt,
          title: newsLists.title,
          content: newsLists.content,
          image: newsLists.image,
          url: newsLists.url,
          source: newsLists.source.name,
        });
        setFeed(loadedFeed);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchedNewsHandler();
  }, []);

  //   let fetchTest = () => {
  //     fetchedNewsHandler();
  //   };
  return (
    <>
      {loading && <Loader />}
      <div>
        <div>
          <NavBar />
          <div className={styles.body}>
            <h1 className={styles.heading}>
              <span className={styles.span}>World</span>Economy
            </h1>
          </div>
          <EconomyNewsFeedList feeds={feed} />
        </div>
        {/* <button onClick={fetchTest}>Click me</button> */}
      </div>
      <div className={styles.error}>{error && <h1>{error} or Check your internet connection</h1>}</div>
    </>
  );
}

export default WorldEconomy;
