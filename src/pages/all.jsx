import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../layout';
import Seo from '../components/Seo';

// markup
const AllPage = () => {
  const title = 'Jenkins - User Story Library - All';
  const { stories } = useStaticQuery(graphql`
    query AllStories {
      stories: allUserStory(sort: { fields: date, order: DESC }) {
        edges {
          node {
            title
            date(formatString: "dddd DD MMMM YYYY")
            tag_line
            image {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 150)
              }
            }
            slug
          }
        }
      }
    }
  `);

  return (
    <Layout title={title}>
      <Seo title={title} pathname="/all" />
      <div className="container">
        <div className="row body">
          <div className="col text-center">
            <h1>Jenkins Is The Way</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2>Tell Your Story</h2>
            <p>
              &quot;Jenkins Is The Way&quot; is a global showcase of how
              developers and engineers are building, deploying, and automating
              great stuff with Jenkins.
            </p>
            <p>
              Share your story and we'll send you a free Jenkins Is The Way
              T-shirt.
            </p>
            <p>
              <a href="/admin/#/collections/user-story">Share the story</a> of
              your project's goals, technical challenges, and the unique
              solutions you encountered with Jenkins.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2>Jenkins User Stories</h2>
            {stories.edges.map(({ node: story }) => (
              <div key={story.slug} className="pb-2">
                <div className="d-flex justify-content-right align-items-center">
                  {story.image && (
                    <div>
                      <Link to={`/user-story/${story.slug}`}>
                        <GatsbyImage
                          image={getImage(story.image)}
                          alt="Logo"
                          className="mr-3"
                        />
                      </Link>
                    </div>
                  )}
                  <div>
                    <div>
                      <Link to={`/user-story/${story.slug}`}>
                        <strong>{story.title}</strong>
                      </Link>
                    </div>
                    <div>
                      <small>{story.date}</small>
                    </div>
                    <div>{story.tag_line}</div>
                    <div>
                      <Link to={`/user-story/${story.slug}`}>Read More »</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllPage;
