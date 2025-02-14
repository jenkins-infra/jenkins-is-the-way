import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from './UserStoryCard.module.css';

function UserStoryCard({ slug, image, title, date, tag_line }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        {image && (
          <Link to={`/user-story/${slug}`} className={styles.imageWrapper}>
            <GatsbyImage
              image={getImage(image)}
              alt={title}
              className={styles.image}
            />
          </Link>
        )}
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <time className={styles.date}>{date}</time>
          <p className={styles.tagline}>{tag_line}</p>
          <Link to={`/user-story/${slug}`} className={styles.readMore}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserStoryCard;
