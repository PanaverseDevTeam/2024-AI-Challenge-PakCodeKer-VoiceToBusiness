/* eslint-disable react/display-name */
"use client";

// import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import React, { forwardRef, useRef } from "react";
import { FaUser } from "react-icons/fa";
import Logo from "@/public/brix-logo.png";
import Image from "next/image";
import { IoIosPaper } from "react-icons/io";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

export function AnimatedBeamDemoMultiple() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  //max-w-[500px] md:shadow-xl border
  return (
    <>
      <div
        className="relative flex w-full max-w-[1000px] my-8 mx-auto items-center justify-center overflow-hidden rounded-lg  bg-background p-10 mt-20"
        ref={containerRef}
      >
        <div className="flex h-full w-full flex-row items-stretch justify-between gap-10">
          <div className="flex flex-col justify-center">
            <Circle ref={div7Ref}>
              {/* <Icons.user className="text-black" /> */}
              <FaUser className=" text-black" />
            </Circle>
          </div>
          <div className="flex flex-col justify-center">
            <Circle ref={div6Ref} className="h-16 w-16">
              {/* <Icons.openai className="h-6 w-6" /> */}
              <Image src={Logo} alt="Alt heading" height={70} width={70} />
            </Circle>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <Circle ref={div1Ref}>
              {/* <Icons.googleDrive className="h-6 w-6" /> */}
              <IoIosPaper className="h-6 w-6" />
            </Circle>
            <Circle ref={div2Ref}>
              {/* <Icons.googleDocs className="h-6 w-6" /> */}
              <IoIosPaper className="h-6 w-6" />
            </Circle>
            <Circle ref={div3Ref}>
              {/* <Icons.whatsapp className="h-6 w-6" /> */}
              <IoIosPaper className="h-6 w-6" />
            </Circle>
            <Circle ref={div4Ref}>
              {/* <Icons.messenger className="h-6 w-6" /> */}
              <IoIosPaper className="h-6 w-6" />
            </Circle>
            <Circle ref={div5Ref}>
              {/* <Icons.notion className="h-6 w-6" /> */}
              <IoIosPaper className="h-6 w-6" />
            </Circle>
          </div>
        </div>

        {/* AnimatedBeams */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div7Ref}
          duration={3}
        />
      </div>
    </>
  );
}
