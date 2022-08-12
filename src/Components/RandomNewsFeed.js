import React, { useState, useEffect } from "react";
import styles from "./RandomNewsFeed.module.css";
import NavBar from "./NavBar";
import RandomNewsFeedList from "./RandomNewsFeedList";
import Loader from "./Loader";

function RandomNewsFeed(props) {
  let [feed, setFeed] = useState([]);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);

  async function fetchedNewsHandler() {
    setFeed([]);
    setLoading(true);
    setError(null);
    let endpoint =
      "https://gnews.io/api/v4/top-headlines?token=6ad4161893ca83bd5bb69478a1ef9f0c&lang=en";
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

    useEffect(() =>{
     fetchedNewsHandler()
    }, [])

//   let fetchTest = () => {
//     fetchedNewsHandler();
//   };
  return (
    <>
      { loading && <Loader />}
      <div>
        <div>
          <div className={styles.body}>
            <h1 className={styles.heading}>
              World<span className={styles.span}>News</span>
            </h1>
          </div>
          <RandomNewsFeedList feeds={feed} />
        </div>
        {/* <button onClick={fetchTest}>Click me</button> */}
      </div>
      <div className={styles.error}>
      {error && <h1>{error} or Check your internet connection 👀</h1>}
      </div>
    </>
  );
}

export default RandomNewsFeed;
