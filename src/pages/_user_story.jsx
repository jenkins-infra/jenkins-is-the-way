import { graphql, Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import truncate from 'truncate';
import Layout from '../layout';
import Seo from '../components/Seo';
import UserStory from '../components/UserStory';

const UserStoryPage = ({ data: { userStory: page }, pageContext }) => {
  const title = page.title;
  return (
    <Layout
      title={title}
      sourcePath={`src/user-story/${page.parent.relativePath}`}
    >
      <Seo title={title} pathname={`/user-story/${page.slug}`} />
      <div className="navbar navbar-expand navbar-light bg-light">
        <ul className="navbar-nav mr-auto w-100 d-flex justify-content-between">
          <li className="nav-item">
            {pageContext.previous && (
              <Link
                className="nav-link"
                to={`/user-story/${pageContext.previous.slug}`}
              >
                &lt;&lt;{' '}
                {truncate(
                  pageContext.previous.title.replace(
                    /^jenkins is the way to/i,
                    '',
                  ),
                  40,
                )}
              </Link>
            )}
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            {pageContext.next && (
              <Link
                className="nav-link"
                to={`/user-story/${pageContext.next.slug}`}
              >
                {truncate(
                  pageContext.next.title.replace(/^jenkins is the way to/i, ''),
                  40,
                )}{' '}
                &gt;&gt;
              </Link>
            )}
          </li>
        </ul>
      </div>
      <UserStory {...page} />
    </Layout>
  );
};

UserStoryPage.displayName = 'UserStoryPage';
UserStoryPage.propTypes = {
  pageContext: PropTypes.shape({
    previous: PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
    next: PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  }),
  data: PropTypes.shape({
    userStory: PropTypes.object.isRequired,
  }),
};

export default UserStoryPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query UserStoryBySlug($id: String!) {
    userStory(id: { eq: $id }) {
      parent {
        ... on File {
          relativePath
        }
      }
      slug
      date
      post_name
      authored_by
      tag_line
      title
      image {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 300)
        }
      }
      quotes {
        from
        image {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 60, height: 60)
          }
        }
        content
      }
      metadata {
        title
        build_tools
        community_supports
        company
        company_website
        industries
        organization
        platforms
        plugins
        programming_languages
        project_website
        project_funding
        summary
        version_control_systems
        team_members
      }
      body_content {
        title
        paragraphs {
          html
        }
      }
    }
  }
`;
