import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Layout from '../layout';
import Seo from '../components/Seo';
import './MapPage.css';

const MapPage = () => {
  const title = 'Jenkins - User Story Library - Map';
  const { stories, mapPin } = useStaticQuery(graphql`
    query MapPageQueries {
      mapPin: file(name: { eq: "jenkins_map_pin2-e1634173081372" }) {
        publicURL
      }
      stories: allUserStory(
        sort: { fields: date, order: DESC }
        filter: { map: { geojson: { ne: null }, location: { ne: null } } }
      ) {
        edges {
          node {
            map {
              authored_by
              geojson
              industries
              location
            }
            metadata {
              industries
            }
            slug
          }
        }
      }
    }
  `);

  const isBrowser = typeof window !== 'undefined';

  if (!isBrowser) {
    return (
      <Layout title={title}>
        <Seo title={title} pathname="/" />
        This page needs javascript
      </Layout>
    );
  }

  const icon = new Icon({
    iconUrl: mapPin.publicURL,
    iconAnchor: [29, 59],
    iconSize: [59, 59],
  });

  return (
    <Layout title={title}>
      <Seo title={title} pathname="/" />
      <div className="container">
        <div className="row text-center">
          <div className="col">
            <h1>Jenkins Is The Way</h1>
            <h2>Latest Jenkins User Stories</h2>
            <h3>
              Zoom into the map below to discover just where in the world you’ll
              find Jenkins users and Jenkins solutions.
            </h3>
          </div>
        </div>
        <div className="row map-container">
          <div className="col">
            <MapContainer
              center={[43.5890452, 0]}
              zoom={2}
              className="leaflet-map"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {stories.edges
                .filter(({ node: story }) => story.map.geojson)
                .map(({ node: story }) => {
                  const geojson = JSON.parse(story.map.geojson);
                  const [longitude, latitude] = geojson.coordinates;

                  return (
                    <Marker
                      key={story.slug}
                      position={[latitude, longitude]}
                      icon={icon}
                    >
                      <Popup>
                        <table className="table">
                          <tbody>
                            <tr
                              style={{
                                border: '0px hidden',
                                padding: '5px',
                              }}
                            >
                              <td
                                style={{
                                  border: '0px hidden',
                                }}
                                colSpan="2"
                              ></td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  border: '0px hidden',
                                }}
                                width="150"
                              >
                                <center>
                                  <StaticImage
                                    src="../images/jenkins_map_pin-180x180-1.png"
                                    alt="map pin"
                                  />
                                </center>
                              </td>
                              <td
                                style={{
                                  border: '0px hidden',
                                  padding: '5px',
                                }}
                              >
                                <dt>{story.map.authored_by}</dt>
                                <dt>{story.map.location}</dt>
                                <dt>
                                  {(
                                    story.map.industries ||
                                    story.metadata.industries ||
                                    []
                                  ).join(', ')}
                                </dt>
                                <dt>
                                  <Link to={`/user-story/${story.slug}`}>
                                    Read user story
                                  </Link>
                                </dt>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Popup>
                    </Marker>
                  );
                })}
            </MapContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MapPage;
