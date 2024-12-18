module.exports = {
    siteMetadata: {
        siteUrl: 'https://stories.jenkins.io',
        description: 'Jenkins is the way',
        twitter: '@jenkinsci',
        githubRepo: 'jenkins-infra/stories',
    },
    plugins: [
        {
            resolve: '@jenkinsci/gatsby-plugin-jenkins-layout',
            options: {
                siteUrl: 'https://stories.jenkins.io',
                githubBranch: 'main',
                manifest: {
                    name: 'Jenkins - User Stories Library',
                    short_name: 'stories',
                }
            },
        },
        {
            resolve: 'gatsby-plugin-decap-cms',
            options: {
                modulePath: `${__dirname}/src/cms/index.jsx`, // Path to your CMS configuration
            },
        },
        {
            resolve: 'gatsby-plugin-matomo',
            options: {
                matomoUrl: 'https://jenkins-matomo.do.g4v.dev',
                siteId: '2',
                siteUrl: 'https://stories.jenkins.io'
            }
        },
        'gatsby-plugin-sitemap',
        'gatsby-plugin-image',
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 590,
                        },
                    },
                ],
            }
        },
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                'name': 'images',
                'path': './src/images/'
            },
            __key: 'images'
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                'name': 'pages',
                'path': './src/pages/'
            },
            __key: 'pages'
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                'name': 'user-stories',
                'path': './src/user-story/'
            },
            __key: 'user-stories'
        },
        {
            resolve: 'gatsby-plugin-extract-schema',
            options: {
                dest: `${__dirname}/schema.graphql`,
            },
        },
    ]
};