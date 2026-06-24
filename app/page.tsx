import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Courses } from "@/components/sections/Courses";
import { Bio } from "@/components/sections/Bio";
import { Videos } from "@/components/sections/Videos";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Courses />
      <Bio />
      <Videos />
      <Footer />
    </main>
  );
}
