import React from 'react';
import PropTypes from 'prop-types';
import Testimonal from '../components/Testimonal';
import ImageWrapper from '../components/ImageWrapper';
import * as styles from './UserStory.module.css';

const titles = {
  build_tools: 'Build Tools',
  community_supports: 'Community Support',
  company: 'Company',
  company_website: 'Company Website',
  funded_by: 'Funded By',
  industries: 'Industries',
  organization: 'Organization',
  platforms: 'Platform',
  plugins: 'Custom Plugins',
  programming_languages: 'Programming Languages',
  project_funding: 'Project Funding',
  project_website: 'Project Website',
  summary: 'Summary',
  team_members: 'Team Members',
  teams: 'Team',
  version_control_systems: 'Version Control System',
};

const fields = [
  'organization',
  'company',
  'company_website',
  'teams',
  'team_members',
  'project_website',
  'project_funding',
  'funded_by',
  'summary',
  'industries',
  'programming_languages',
  'platforms',
  'version_control_systems',
  'build_tools',
  'plugins',
  'community_supports',
];

const UserStory = ({
  image,
  title,
  authored_by,
  tag_line,
  quotes,
  metadata,
  body_content,
}) => {
  return (
    <div className={styles.userstory}>
      <div className={`row ${styles.titlewrapper}`}>
        <div className={`col ${styles.title}`}>
          <div className="container">
            <h2>{title}</h2>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="container pb-2">
            <h1>{tag_line}</h1>
          </div>

          <div className="container pt-2 pb-2">
            <strong>Authored By Jenkins User {authored_by}</strong>
          </div>

          <div className="container pt-2 pb-2">{metadata.title}</div>

          {fields.some(field => metadata[field]) && (
            <div className="container pt-2 pb-2">
              <div className="jumbotron">
                <div className="media d-block d-md-flex gap-3 align-items-center">
                  {image && (
                    <ImageWrapper
                      image={image}
                      alt="Logo"
                      className={`${styles.mediaImage}`}
                    />
                  )}
                  <div className="media-body">
                    {fields
                      .filter(field => metadata[field])
                      .map(field => (
                        <div key={field} className="pb-2">
                          <strong>{titles[field]}: </strong>
                          {Array.isArray(metadata[field])
                            ? metadata[field].join(', ')
                            : metadata[field]}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="container pt-2 pb-2">
            <h3>{body_content.title}</h3>
            {body_content.paragraphs &&
              body_content.paragraphs.reduce((content, p, idx) => {
                content.push(
                  <div
                    key={idx}
                    dangerouslySetInnerHTML={{
                      __html: p.html,
                    }}
                  />,
                );
                if (idx !== 0 && idx % 3 === 0) {
                  const quoteIdx = idx / 3 - 1;
                  if (quotes[quoteIdx]) {
                    content.push(
                      <div
                        key={`quote_container_${quoteIdx}`}
                        className={styles.speechBubbleWrapper}
                      >
                        <Testimonal
                          key={`quote_${quoteIdx}`}
                          from={quotes[quoteIdx].from}
                          image={quotes[quoteIdx].image}
                        >
                          <div className={styles.speechBubble}>
                            {quotes[quoteIdx].content}
                          </div>
                        </Testimonal>
                      </div>,
                    );
                  }
                }
                return content;
              }, [])}
          </div>
        </div>
      </div>
    </div>
  );
};

UserStory.displayName = 'UserStory';
UserStory.propTypes = {
  // children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  authored_by: PropTypes.string.isRequired,
  tag_line: PropTypes.string.isRequired,
  image: PropTypes.object,
  metadata: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  quotes: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      from: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ),
  body_content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(
      PropTypes.shape({
        html: PropTypes.string.isRequired,
      }),
    ),
  }),
};

export default UserStory;
