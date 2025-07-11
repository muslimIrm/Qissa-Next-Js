
import Link from "next/link"
import Image from "next/image";
function StoryMap({stories}) {
    return (
        stories.map((story, index) => (
            <div className="card" key={index}>
                <div className="content-card">
                    <h2 className="title-card">{story.title}</h2>
                    <p className="description-card">{story.content.length > 200 ? story.content.slice(0, 200) + "..." : story.content}</p>
                    <span className="">{story.surce}</span>
                    <Link href={`/stories/${story._id}`} className="read-more">اقرأ المزيد</Link>
                </div>
                {
                    story.image && story.image.length > 0 ? (
                        <div className="image-card">
                            <Image src={story.image} width={400} height={400} alt={"card-image"} />
                        </div>) : ""
                }
            </div>
        ))
    );
}

export default StoryMap;