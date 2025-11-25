"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "@/../public/lotties/empty.json";

export default function Animated() {
  return <Lottie animationData={animationData} loop className="w-full h-48" />;
}
