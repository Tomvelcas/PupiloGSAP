'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const VideoPinSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(
    () => {
      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".vd-pin-section",
            start: "-15% top",
            end: "200% top",
            scrub: 1.5,
            pin: true,
          },
        });

        tl.to(".video-box", {
          clipPath: "circle(100% at 50% 50%)",
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [isMobile] }
  );

  return (
    <>
      <section className="vd-pin-section">
        <div
          style={{
            clipPath: isMobile
              ? "circle(100% at 50% 50%)"
              : "circle(6% at 50% 50%)",
          }}
          className="size-full video-box"
        >
          <video src="/videos/pin-video.mp4" playsInline muted loop autoPlay />

          <div className="abs-center md:scale-100 scale-200">
            <img src="/images/circle-text.svg" alt="" className="spin-circle" />
            <div
              className="play-btn"
              role="button"
              tabIndex={0}
              onClick={() => setIsModalOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setIsModalOpen(true);
                }
              }}
            >
              <img
                src="/images/play.svg"
                alt=""
                className="size-[3vw] ml-[.5vw]"
              />
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              src="/videos/Pupilo.mp4"
              autoPlay
              controls
              playsInline
              className="size-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPinSection;
