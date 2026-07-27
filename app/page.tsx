import { getFeaturedWork, getWorkByCategory } from "@/lib/gallery";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import MobileStudio from "@/components/MobileStudio";
import FeaturedWork from "@/components/FeaturedWork";
import Occasions from "@/components/Occasions";
import Testimonials from "@/components/Testimonials";
import ClosingCTA from "@/components/ClosingCTA";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  const featured = getFeaturedWork(6);
  const cover = {
    weddings: getWorkByCategory("weddings")[0],
    suiting: getWorkByCategory("suiting")[0],
    womenswear: getWorkByCategory("womenswear")[0],
    juniors: getWorkByCategory("juniors")[0],
  };

  return (
    <>
      <JsonLd />
      <h1 className="sr-only">Suits By Roseign: Bespoke Tailoring Across the GTA</h1>
      <Hero />
      <Statement />
      <MobileStudio />
      <FeaturedWork images={featured} />
      <Occasions cover={cover} />
      <Testimonials />
      <ClosingCTA />
    </>
  );
}
