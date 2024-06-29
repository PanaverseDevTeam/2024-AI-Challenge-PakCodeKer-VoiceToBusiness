"use client";
import React, { useCallback, useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Engine } from "tsparticles-engine";
import { BorderBeam } from "../magicui/border-beam";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const [enableParticles, setEnableParticles] = useState(true);

  console.log("Enable Particles --->", enableParticles);

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log("particles.js loaded");
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    console.log("particles.js container loaded");
    console.log(container);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Disable particles if window width is less than or equal to 768 pixels
      if (window.innerWidth <= 768) {
        setEnableParticles(false);
        return;
      }
      //   setEnableParticles(window.innerWidth > 768);
    };

    // Set initial state based on window size and set up event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [enableParticles]);

  return (
    <section className="relative bg-gradient-to-br from-white via-white text-center py-20">
      {enableParticles && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
            },
            particles: {
              color: {
                value: "#828282",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 10,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
      <div className="container mx-auto px-4 z-10 relative">
        <h2 className=" text-4xl sm:text-6xl md:text-8xl mt-20 font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-200">
          Generate Your Business With <p>One Click.</p>
        </h2>
        <div className="mb-10 subpixel-antialiased italic text-xl">
          From daydream to success story with just one click
        </div>

        {/* Button */}
        <div className=" my-4">
          <Button onClick={() => router.push("/login")} className="">
            Let&apos;s Start
          </Button>
        </div>
        <div className="flex justify-center">
          <div className="w-[990px] max-w-8xl h-[600px] bg-gray-200 rounded-2xl relative">
            <BorderBeam className="absolute bottom-0 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
