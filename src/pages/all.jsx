import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../layout';
import Seo from '../components/Seo';
import UserStoryCard from '../components/UserStoryCard';

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
              <UserStoryCard
                key={story.slug}
                slug={story.slug}
                image={story.image}
                title={story.title}
                date={story.date}
                tag_line={story.tag_line}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllPage;
