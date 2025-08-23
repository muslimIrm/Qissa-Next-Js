const axios = require('axios');

module.exports = {
  siteUrl: 'https://qissa-black.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/dashboard'],
  async additionalPaths() {
    try {
      const res = await axios.get('https://qissa-black.vercel.app/api/stories?limit=10000&page=1&state=published');
      const stories = res.data.storiesRaw;

      return stories.map(story => ({
        loc: `/stories/${story._id}`,
        lastmod: story.updatedAt || new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8,
      }));
    } catch (err) {
      console.error('فشل جلب القصص للسيت ماب:', err);
      return [];
    }
  },
};
