
import "./home.css";
import { HomeImage, BgImage } from "./ componentsHome/Images";
import Buttons from "./ componentsHome/Buttons";
import Content from "./ componentsHome/Content";
function Main() {

    return (

        <section className="home relative overflow-hidden" id="home">
            <div className="container !flex !justify-between gap-10">
                <div className="content ">
                    <div>
                        <Content />
                    </div>
                    <div className="flex gap-6 max-md:flex-col">
                        <Buttons />
                    </div>

                    <div className=" absolute bottom-5 max-sm:hidden">
                        <h2>الموقع قيد التطوير</h2>
                        <h3>نبذل اقصى الجهود لتقديم الموقع بالصورى الفضلى، شاكرين صبركم.</h3>
                    </div>
                    <BgImage />


                </div>
                <div className="image">
                    <HomeImage />

                </div>
            </div>
        </section>

    );
}

export default Main