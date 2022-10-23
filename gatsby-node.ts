/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

interface PageInput {
  path: string
  component: string
  layout?: string
  context?: any
  matchPath?: any
}

interface BoundActionCreators {
  page: PageInput,
  actions: {
    createPage: (page: PageInput) => void
    deletePage: (page: PageInput) => void
    createRedirect: (
      opts: {
        fromPath: string
        isPermanent?: boolean
        redirectInBrowser?: boolean
        toPath: string
      }
    ) => void
  }
  graphql: any
}

exports.onCreatePage = async ({ page, actions }: BoundActionCreators) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = '/app/*';

    // Update the page.
    createPage(page);
  }
};

// You can delete this file if you're not using it
// exports.onCreateWebpackConfig = ({ stage, actions, getConfig, loaders }) => {
//   if (stage === "build-html" || stage === "develop-html") {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /firebase/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     })
//   }
// }
