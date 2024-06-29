import Start from "@/components/Start";
import { Footer } from "@/components/landing-page/Footer";
import { Heading } from "@/components/landing-page/Heading";
import Feature from "@/components/landing-page/feature";
import Header from "@/components/landing-page/header";
import Hero from "@/components/landing-page/hero";
import { AnimatedBeamDemoMultiple } from "@/components/magicui/animated-beam-mutliple";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Feature />
      <Heading />
      <AnimatedBeamDemoMultiple />
      <Footer />
    </div>
  );
}
