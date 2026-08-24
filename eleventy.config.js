const navigationPlugin = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(navigationPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");

  // Standalone event sites (migrated from their own repos/subdomains).
  // Copied verbatim — their HTML must not be run through the template engine.
  for (const site of ["carnival", "auction", "give"]) {
    eleventyConfig.addPassthroughCopy(`src/${site}`);
    eleventyConfig.ignores.add(`src/${site}/**`);
  }

  // Look up a page's `summary` front matter by URL (used for section cards)
  eleventyConfig.addFilter("summaryFor", (collection, url) => {
    const match = collection.find((item) => item.url === url);
    return (match && match.data.summary) || "";
  });

  return {
    // PATH_PREFIX is "/website/" while previewing at abernethy-pta.github.io/website/;
    // unset (i.e. "/") once the site is served at supportabernethy.org
    pathPrefix: process.env.PATH_PREFIX || "/",
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
};
