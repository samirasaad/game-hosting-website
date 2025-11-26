"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

interface Props {
  title: string;
  url: string;
}

export default function ShareOptions({ title, url }: Props) {
  return (
    <div className=" p-1 rounded-xl bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center gap-3">
        <FacebookShareButton url={url} >
          <FacebookIcon size={25} round />
        </FacebookShareButton>

        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={25} round />
        </TwitterShareButton>

        <WhatsappShareButton url={url} title={title} separator=" - ">
          <WhatsappIcon size={25} round />
        </WhatsappShareButton>

       
      </div>
    </div>
  );
}
