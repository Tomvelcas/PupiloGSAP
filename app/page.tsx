'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import NavBar from "@/components/NavBar";
import HeroSection from "@/sections/HeroSection";
import MessageSection from "@/sections/MessageSection";
import FlavorSection from "@/sections/FlavorSection";
import NutritionSection from "@/sections/NutritionSection";
import BenefitSection from "@/sections/BenefitSection";
import TestimonialSection from "@/sections/TestimonialSection";
import FooterSection from "@/sections/FooterSection";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function HomePage() {
  useGSAP(() => {
    const existing = ScrollSmoother.get();
    existing?.kill();

    const smoother = ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <main>
      <NavBar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <MessageSection />
          <FlavorSection />
          <NutritionSection />
          <div>
            <BenefitSection />
            <TestimonialSection />
          </div>
          <FooterSection />
        </div>
      </div>
    </main>
  );
}
