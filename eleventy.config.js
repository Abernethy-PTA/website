const navigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(navigationPlugin);
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");

  // Look up a page's `summary` front matter by URL (used for section cards)
  eleventyConfig.addFilter("summaryFor", (collection, url) => {
    const match = collection.find((item) => item.url === url);
    return (match && match.data.summary) || "";
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
};
