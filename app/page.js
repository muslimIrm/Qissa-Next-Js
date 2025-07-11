
import dynamic from "next/dynamic";import Main from "./  components/main/home/Home";
import Header from "./  components/main/header/Header";
import Verse from "./  components/main/verse/Verse";
const LastStories = dynamic(()=> import("./  components/main/last_sotries/LastStories"), {loading: ()=>{<p>Loading</p>}})
const ContactSection = dynamic(()=> import("./  components/main/contact/Contact"), {loading: ()=>{<p>Loading</p>}})
import Footer from "./  components/main/footer/Footer";
export default function Home() {
  return (
    <div>
      <Header/>
      <Main/>
      <Verse/>
      <LastStories/>
      <ContactSection/>
      <Footer/>
    </div>
  );
}
