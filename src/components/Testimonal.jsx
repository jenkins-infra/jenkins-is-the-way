import React from 'react';
import PropTypes from 'prop-types';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import * as styles from './Testimonal.module.css';

const Testimonal = ({ from, image, children }) => {
  return (
    <div className={`${styles.root} pb-3`}>
      <blockquote>{children}</blockquote>
      <div
        className={`${styles.attribution} d-flex justify-content-center align-items-center`}
      >
        {image && (
          <div>
            <GatsbyImage
              image={getImage(image)}
              className="mr-3 rounded-circle"
              height="60"
              width="60"
              alt="profile picture"
            />
          </div>
        )}
        <div className={`${styles.from} mx-3 px-4 py-2`}>
          <span className={styles.name}>{from.split(',')[0]}</span>
          <br />
          <span className={styles.title}>
            {from.split(',').slice(1).join(',').trim()}
          </span>
        </div>
      </div>
    </div>
  );
};

Testimonal.displayName = 'Testimonal';
Testimonal.propTypes = {
  from: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  image: PropTypes.shape({}),
};

export default Testimonal;
