import React from 'react'
import styles from './SearchNewsFeed.module.css'

function SearchNewsFeed(props) {
    return (
        <div className={styles.body}>
          <ul className={styles.list}>
            {props.feeds.map((feeds) => (
              <div className={styles.card} key={feeds.id}>
                <div className={styles.wrapper}>
                  <img src={feeds.image} />
                </div>
                <h1 className={styles.title}>{feeds.title}</h1>
                <h3 className={styles.content}>{feeds.content}</h3>
                <h3 className={styles.time}>
                  <a href={feeds.url} target="_blank">
                    Read More
                  </a>
                </h3>
                <h3 className={styles.time}>Source: {feeds.source}</h3>
                <p className={styles.time}>{feeds.time}</p>
              </div>
            ))}
          </ul>
        </div>
      );
}

export default SearchNewsFeed