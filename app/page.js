
import dynamic from "next/dynamic";import Main from "./  components/main/home/Home";
import Header from "./  components/main/header/Header";
import Verse from "./  components/main/verse/Verse";
const LastStories = dynamic(()=> import("./  components/main/last_sotries/LastStories"), {loading: ()=>{<p>Loading</p>}})
const ContactSection = dynamic(()=> import("./  components/main/contact/Contact"), {loading: ()=>{<p>Loading</p>}})
import Footer from "./  components/main/footer/Footer";
import FabButton from "./  components/main/fabButton/Fab"
export default function Home() {
  return (
    <div className=" relative">
      <Header/>
      <Main/>
      <Verse/>
      <LastStories/>
      <ContactSection/>
      <Footer/>

      <FabButton isHidden={false}/>
    </div>
  );
}
