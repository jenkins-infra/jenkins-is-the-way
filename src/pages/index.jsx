import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../layout';
import Seo from '../components/Seo';

// markup
const IndexPage = () => {
  const title = 'Jenkins - User Story Library';
  const { stories } = useStaticQuery(graphql`
    query FrontPageStories {
      stories: allUserStory(sort: { fields: date, order: DESC }, limit: 4) {
        edges {
          node {
            title
            date
            tag_line
            authored_by
            slug
          }
        }
      }
    }
  `);

  return (
    <Layout title={title}>
      <Seo title={title} pathname="/" />

      <div className="container">
        <div className="row">
          <div className="col-4">
            <StaticImage
              src="../images/Jenkins-is-the-Way-768x911.png"
              width={768}
              height={911}
              alt="jenkins is the way logo"
            />
          </div>
          <div className="col-8">
            <div>
              <h1>Jenkins Is The Way</h1>
              <h2>Latest Jenkins User Stories</h2>
              {stories.edges.map(({ node: story }) => (
                <div key={story.slug} className="pb-2">
                  <div>
                    <Link to={`/user-story/${story.slug}`}>{story.title}</Link>
                  </div>
                  Authored By Jenkins User <strong>{story.authored_by}</strong>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Link className="btn btn-primary" to="/all">
                Read User Stories
              </Link>
            </div>
          </div>
        </div>
        <div className="row pt-2">
          <div className="col">
            <div className="jumbotron">
              <div className="row">
                <div className="col text-center">
                  <div className="pb-2">
                    <StaticImage
                      src="../images/Screen-Shot-2021-11-18-at-10.18.48-AM.png"
                      alt="screenshot of pins on a map"
                    />
                  </div>
                  <div className="text-center pt-2">
                    <Link className="btn btn-primary" to="/map">
                      Visit the map!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
