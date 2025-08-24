import { Feed } from 'feed';
import axios from 'axios';

const URL = "https://qissa.onrender.com/";

export async function GET() {
  try {
    const limit = 10000;
    const page = 1;
    const state = "published";


    const res = await axios.get(`${URL}api/stories?limit=${limit}&page=${page}&state=${state}`)
    const newStories = await res.data.storiesRaw

    const stories = newStories || []; // إذا لم يوجد stories نضع مصفوفة فارغة

    const feed = new Feed({
      title: "Qissa Black",
      description: "Latest stories from Qissa Black",
      id: "https://qissa-black.vercel.app/",
      link: "https://qissa-black.vercel.app/",
    });



    stories.forEach(story => {
      feed.addItem({
        title: story.title,
        id: `https://qissa-black.vercel.app/story/${story._id}`,
        link: `https://qissa-black.vercel.app/story/${story._id}`,
        date: new Date(story.updatedAt),
        description: story.content,
      });
    });

    return new Response(feed.rss2(), {
      headers: { 'Content-Type': 'application/rss+xml' }
    });

  } catch (error) {
    console.error(error);
    return new Response("Error generating RSS feed", { status: 500 });
  }
}
