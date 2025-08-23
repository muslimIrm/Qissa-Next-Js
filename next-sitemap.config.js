const axios = require('axios');

module.exports = {
  siteUrl: 'https://qissa-black.vercel.app', // رابط موقعك
  generateRobotsTxt: true, // لإنشاء robots.txt تلقائيًا
  sitemapSize: 50000,      // أقصى عدد روابط لكل ملف sitemap
  async additionalPaths(config) {
    try {
      // جلب كل القصص من API
      const res = await axios.get('https://qissa-black.vercel.app/api/stories?limit=10000&page=1&state=published');
      const stories = res.data.storiesRaw;

      // تحويل كل قصة لرابط في السايت ماب
      return stories.map(story => ({
        loc: `/stories/${story._id}`, 
        lastmod: story.updatedAt || new Date().toISOString(),
        priority: 0.8,
        changefreq: 'weekly',
      }));
    } catch (err) {
      console.error('فشل جلب القصص للسيت ماب:', err);
      return [];
    }
  },
};
