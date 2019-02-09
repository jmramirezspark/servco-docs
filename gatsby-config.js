const config = {
  start_url: `/`,
  background_color: `#663399`,
  theme_color: `#663399`,
  icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
};

module.exports = {
  siteMetadata: {
    title: `ServCo Wiki`,
    description: `ServCo Docs`,
    author: `@lduenas`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/wiki`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: config.start_url,
        background_color: config.background_color,
        theme_color: config.theme_color,
        icon: config.icon,
        display: `minimal-ui`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-wiki-template',
        short_name: 'gatsby-wiki',
        start_url: config.start_url,
        background_color: config.background_color,
        theme_color: config.theme_color,
        icon: config.icon,
        display: `standalone`,
      },
    },
    'gatsby-plugin-offline',
  ],
};
