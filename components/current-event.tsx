import Image from "next/image";
import Change from "../public/images/coverimg.jpg";
import ChangeMobile from "../public/images/coverimg-mobile.png";

export default function CurrentEventBanner() {
  return (
    <>
      <Image
        src={Change}
        // style={{ margin: "auto" }}
        className="hidden md:block w-full"
        placeholder="blur"
        alt="Promotional image of the Change Conference"
      />
      <Image
        src={ChangeMobile}
        style={{ margin: "auto" }}
        className="block md:hidden"
        placeholder="blur"
        alt="Promotional image of the Change Conference"
      />
    </>
  );
}
