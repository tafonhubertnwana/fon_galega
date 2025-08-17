import Navbar from "@/components/navbar";
import Image from "next/image";
import HomeBanner from "@/components/homeBanner";
import FonHistory from "@/components/fonHistory";
import Events from "@/components/events";

export default function Home() {
  return (
    <div >
      <Navbar />
      <HomeBanner />
      <FonHistory />
      <Events />

    </div>
  );
}
