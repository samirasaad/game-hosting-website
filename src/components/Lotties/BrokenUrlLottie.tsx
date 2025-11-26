"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "@/../public/lotties/brokenUrl.json";

export default function BrokenUrlLottie() {
  return <Lottie animationData={animationData} loop className="w-full h-24" />;
}
