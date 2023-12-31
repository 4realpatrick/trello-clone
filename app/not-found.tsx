"use client";
import { Button } from "@/components/ui/button";
import { notFoundFont } from "@/constant/headingFont";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  const handleGoHome = () => {
    router.push("/");
  };
  const handleBack = () => {
    router.back();
  };
  return (
    <div
      className={`w-screen h-screen overflow-hidden bg-fixed bg-cover md:bg-[url("/404-bg.png")] relative md:flex`}
    >
      <div className="hidden md:block">
        <div className="md:w-[40vw] z-[1] md:absolute md:left-[10%] md:top-[40%] md:-translate-y-1/2">
          <h1 className={cn("text-6xl mb-8", notFoundFont.className)}>404</h1>
          <p
            className={cn(
              "text-2xl my-4 text-primary leading-8",
              notFoundFont.className
            )}
          >
            You are lost this page
          </p>
          <p
            className={cn("text-base hidden md:block", notFoundFont.className)}
          >
            you&apos;ve reached the edge of universe.The Page you&apos;ve
            requested , can&apos;t be found. Don&apos;t Worry , you can return
            to previous page.
          </p>
          <div className="mt-10">
            <Button size="lg" variant="secondary" onClick={handleGoHome}>
              Go Home
            </Button>
            <Button size="lg" className="ml-5" onClick={handleBack}>
              Go Back
            </Button>
          </div>
        </div>
        <div className="translate-y-[-18%] animate-[not-found_3s_linear_infinite_alternate] md:absolute md:top-1/2 md:left-1/2">
          <img
            src="/404-astronaut.png"
            // className="sm:w-[70%] sm:h-4/5 sm:translate-y-[40%]"
            alt=""
          />
        </div>
      </div>
      <div className="md:hidden flex flex-col justify-center items-center h-full bg-background">
        <h1 className={cn("text-3xl leading-8", notFoundFont.className)}>
          404
        </h1>
        <p
          className={cn(
            "text-xl my-10 text-primary text-center leading-10",
            notFoundFont.className
          )}
        >
          You are lost this page
        </p>
        <Button variant="secondary" size="lg" onClick={handleGoHome}>
          Go Home
        </Button>
        <Button size="lg" className="mt-5" onClick={handleBack}>
          Go Back
        </Button>
        <div className="animate-[not-found_3s_linear_infinite_alternate] flex justify-center mt-28">
          <img src="/404-astronaut.png" className="w-[70%]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
