import React, { useState, useEffect } from "react";
import styles from "./Nigeria.module.css";
import NavBar from "./NavBar";
import NigeriaNewsFeedList from "./NigeriaNewsFeedList";
import Loader from "./Loader";

function Nigeria() {
  let [feed, setFeed] = useState([]);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);

  async function fetchedNewsHandler() {
    setFeed([]);
    setLoading(true);
    setError(null);
    let endpoint =
      "https://gnews.io/api/v4/search?q=nigeria&token=6ad4161893ca83bd5bb69478a1ef9f0c&lang=en";
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

  return (
    <>
      {loading && <Loader />}
      <div>
        <div className={styles.body}>
          <h1 className={styles.heading}>
            Nige<span className={styles.span}>ria</span>News
          </h1>
        </div>
        <div className={styles.error}>{error && <h1>{error} or Check your internet connection 👀</h1>}</div>
        <NigeriaNewsFeedList feeds={feed} />
      </div>
    </>
  );
}

export default Nigeria;
