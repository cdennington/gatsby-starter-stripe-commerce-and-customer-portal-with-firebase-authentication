const path = require('path');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const gatsbyRequiredRules = path.join(
  process.cwd(),
  'node_modules',
  'gatsby',
  'dist',
  'utils',
  'eslint-rules'
);

module.exports = {
  siteMetadata: {
    title: 'gatsby starter stripe commerce and customer portal with firebase authentication',
    description: '',
    author: 'DESIGN-ID (https://design-id.tech/)',
    siteUrl: process.env.GATSBY_SITE_URL,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: [
          '/app',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `${process.env.GATSBY_SITE_URL}`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `shop`,
        short_name: `shop`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        rulePaths: [gatsbyRequiredRules],
        stages: ['develop'],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: ['node_modules', 'bower_components', '.cache', 'public'],
      }
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
        additionalData: `@use "/src/assets/styles/base/variables" as var;`
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
          options: {
            props: {
              className: 'svg',
            },
          },
        },
      },
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ['Product', 'Price'],
        secretKey: `${process.env.GATSBY_STRIPE_SECRET_KEY}`,
        downloadFiles: true,
      }
    },
  ],
}
