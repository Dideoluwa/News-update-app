import React, { useState, useRef } from "react";
import NavBar from "./NavBar";
import styles from "./SearchNews.module.css";
import SearchNewsFeed from "./SearchNewsFeed";
import Loader from "./Loader";

function SearchNews() {
  let [feed, setFeed] = useState([]);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let inputRef = useRef('')

  async function fetchedNewsHandler() {
    setFeed([]);
    setLoading(true);
    setError(null);
    let endpoint =
      `https://gnews.io/api/v4/search?q=${inputRef.current.value}&token=8bf54c1726132fb46b390fde828c303a&lang=en`
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

  let submitFormHandler = (e) => {
    e.preventDefault()
    // if(inputRef.current.value. = ''){
    //   return;
    // }
    fetchedNewsHandler()
    inputRef.current.value = ''

  }

  let searchChangeHandler = () => {
    inputRef.current.value
  }
  return (
    <>
      {loading && <Loader />}
      <div>
        <div>
          <div className={styles.cover}>
            <div className={styles.header}>
              <h1>Search<span className={styles.span}>News...</span></h1>
            </div>
            <div className={styles.form}>
              <form
                onSubmit={submitFormHandler}>
                <div className={styles.input}>
                  <input
                    onChange={searchChangeHandler}
                    ref={inputRef}
                    placeholder="Search news..."
                    type='search' />
                  <button>Submit</button>
                </div>
              </form>
            </div>
          </div>
          <SearchNewsFeed feeds={feed} />
        </div>
      </div>
      <div className={styles.error}>
        {error && <h1>{error} or Check your internet connection 👀</h1>}
      </div>
    </>
  );
}

export default SearchNews;
