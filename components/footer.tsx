import Container from "./container";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import flickr from "../public/images/flickr.png";
import instagram from "../public/images/icons/instagram-icon.png";
import linkedin from "../public/images/icons/linkedIn-icon.png";
import facebook from "../public/images/icons/facebook-icon.png";
import Image from "next/image";
import profilePic from "../public/images/tedx.png";
import profilePicLight from "../public/images/tedxwhite.png";
import { useTheme } from "next-themes";
import { ExternalLink } from "react-external-link";

import Link from "next/link";

const FollowSocial = () => {
  return (
    <div className="flex flex-col flex-start px-5 max-[1023px]:items-center max-[1023px]:mt-10">
      <div className="text-sm font-semibold leading-6  text-gray-900 dark:text-slate-50  ">
        Follow us:
      </div>
      <div className="flex pt-5">
        <ExternalLink href="https://www.instagram.com/tedxtrondheim/">
          <Image
            className="h-8 w-auto px-1 sm:px-3"
            src={instagram}
            alt="TEDxTrondheim Instagram"
          />
        </ExternalLink>
        <ExternalLink href="https://no.linkedin.com/company/tedxtrondheim">
          <Image
            className="h-8 w-auto px-1 sm:px-3"
            src={linkedin}
            alt="TEDxTrondheim LinkedIn"
          />
        </ExternalLink>
        <ExternalLink href="https://www.facebook.com/TEDxTrondheim">
          <Image
            className="h-8 w-auto px-1 sm:px-3"
            src={facebook}
            alt="TEDxTrondheim Facebook"
          />
        </ExternalLink>
      </div>
    </div>
  );
};

export default function Footer({ nav }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  return (
    <footer className="bg-white dark:bg-zinc-900 p-20">
      <Container>
        <div className="flex justify-between min-[1024px]:flex-row flex-col max-[1023px]:items-center">
          <div>
            <Link href={"/"} className="max-[1023px]:p-10">
              <Image
                className="h-8 w-auto"
                src={profilePicLight}
                // src={resolvedTheme=='dark'?profilePicLight:profilePic}
                alt="Picture of the TEDXTrondheim"
              />
            </Link>
          </div>
          <div className="flex flex-row min-[1024px]:flex-row flex-col max-[1023px]:items-center">
            <div className="">
              {nav.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  className="text-sm font-semibold leading-6 p-1 md:p-10 lg:py-0 text-gray-900 dark:text-slate-50  hover:text-red-700 "
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <FollowSocial />
          </div>
        </div>
      </Container>
    </footer>
  );
}
