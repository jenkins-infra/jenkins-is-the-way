import React from 'react';
import PropTypes from 'prop-types';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const ImageWrapper = ({ image, alt, ...rest }) => {
  if (typeof image === 'string') {
    // this is an image coming from Netlify CMS
    return <img src={image} {...rest} alt={alt} />;
  } else {
    // this should be an image processed by gatsby-plugin-image
    const imageRef = getImage(image);
    return <GatsbyImage image={imageRef} alt={alt} {...rest} />;
  }
};

ImageWrapper.displayName = 'ImageWrapper';
ImageWrapper.propTypes = {
  image: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageWrapper;
