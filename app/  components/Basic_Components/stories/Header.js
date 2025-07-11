import Link from "next/link";
import { TfiBackRight } from "react-icons/tfi";

export default function Header({ path }) {
    return (
        <>
            <div className="fixed top-0 !z-50 w-full py-3 bg-[var(--second-color)] border-b border-[var(--primary-color)]">
                <div className="container relative h-[60px]">

                    {/* زر الرجوع */}
                    <Link href={path} className="absolute right-4 top-1/2 -translate-y-1/2">
                        <TfiBackRight className="text-2xl md:text-3xl text-[var(--primary-color)]" />
                    </Link>

                    {/* العنوان */}
                    <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl md:text-4xl font-bold text-center">
                        <Link href={"/"}>قصة</Link>
                    </h1>

                </div>
            </div>
        </>
    );
}