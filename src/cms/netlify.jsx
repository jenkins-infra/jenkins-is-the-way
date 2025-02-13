import CMS from 'netlify-cms-app';
import React from 'react';
import Layout from '../layout';

import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import remark from 'remark';
import remarkHtml from 'remark-html';

import UserStory from '../components/UserStory';

const UserStoryPreview = ({ entry, widgetsFor, getAsset }) => {
  const data = entry.toJS().data;
  const paragraphs = widgetsFor('body_content').getIn(['data', 'paragraphs']);
  for (let i = 0; i < data.body_content.paragraphs.length; i++) {
    data.body_content.paragraphs[i] = {
      html: remark().use(remarkHtml).processSync(paragraphs.get(i)).toString(),
    };
  }
  data.quotes = data.quotes.map(function (quote, idx) {
    const quoteData = entry.getIn(['data', 'quotes', idx]).toJS();
    return {
      ...quote,
      image: getAsset(quoteData.image).url,
    };
  });

  const props = {
    ...data,
    image: getAsset(entry.getIn(['data', 'image'])).url,
  };
  console.log('props', props);
  return (
    <Layout title={'foo'}>
      <UserStory {...props} />
    </Layout>
  );
};

UserStoryPreview.propTypes = {
  entry: ImmutablePropTypes.map.isRequired,
  widgetsFor: PropTypes.func.isRequired,
  getAsset: PropTypes.func.isRequired,
};

CMS.registerPreviewTemplate('user-story', UserStoryPreview);

// CMS.registerRemarkPlugin(shortcodes);
