
import Image from "next/image";


function HomeImage() {

    return (
        <>
            <Image src="/home_image.webp"
                width={580}
                height={400}
                alt="home"
                className="rounded-2xl"
                priority
            />
        </>
    );
}

function BgImage() {
    return (
        <>
            <Image
                src="/bg.webp"
                width={896}
                height={600}
                alt="background"
                className="absolute bottom-0 right-0 opacity-9"
                style={{ zIndex: -1 }}
                priority
            />
        </>
    );
}


export { HomeImage, BgImage }