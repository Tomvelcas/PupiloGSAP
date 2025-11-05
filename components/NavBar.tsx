'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setIsAudioPlaying(false));
      }
    } else {
      audio.pause();
    }
  }, [isAudioPlaying]);

  useGSAP(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const fadeTl = gsap
      .timeline({ paused: true })
      .to(controls, {
        autoAlpha: 0,
        y: -18,
        duration: 0.35,
        ease: "power2.out",
        pointerEvents: "none",
      });

    const trigger = ScrollTrigger.create({
      trigger: ".hero-container",
      start: "bottom top+=48",
      onEnter: () => fadeTl.play(),
      onLeaveBack: () => fadeTl.reverse(),
    });

    return () => {
      trigger.kill();
      fadeTl.kill();
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between md:px-14 px-6 py-5">
      <Link href="/" className="block">
        <img
          src="/images/logo-pupilo.svg"
          alt="Pupilo"
          className="md:w-[15rem] w-36 max-w-none"
        />
      </Link>

      <div ref={controlsRef} className="flex items-center">
        <button
          type="button"
          onClick={() => setIsAudioPlaying((prev) => !prev)}
          className="group flex items-center gap-2 rounded-full bg-[#1f1d29] px-6 py-3 text-base md:text-lg font-semibold text-white shadow-[0_22px_44px_-18px_rgba(31,29,41,0.85)] transition duration-200 hover:-translate-y-[2px] hover:shadow-[0_28px_52px_-20px_rgba(31,29,41,0.9)]"
          aria-label="Control de audio"
        >
          <span className="audio-indicator">
            {[0, 1, 2, 3].map((bar) => (
              <span
                key={bar}
                className={`audio-indicator-line ${isAudioPlaying ? "active" : ""}`}
                style={{ animationDelay: `${bar * 0.12}s` }}
              />
            ))}
          </span>
        </button>

        <audio
          ref={audioRef}
          className="hidden"
          src="/audio/audio-loop.mp4"
          loop
          preload="none"
        />
      </div>
    </nav>
  );
};

export default NavBar;
