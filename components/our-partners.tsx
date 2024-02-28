import Image from "next/image";
import Sparebank1 from "../public/images/logos/sparebank-1.png";
import MollerBil from "../public/images/logos/moller-bil.png";
import Digs from "../public/images/logos/digs.png";

export default function OurPartners() {
  return (
    <div className="mt-20 px-8 md:px-14 ">
      <h1 className=" text-xl md:text-2xl  text-gray-900 dark:text-slate-100 ">
        Our partners
      </h1>

      <div className="flex items-center md:justify-evenly pt-10 p-20 md:pb-20 flex-col md:flex-row">
        <Image
          src={Sparebank1}
          style={{ maxWidth: "200px", height: "auto" }}
          className="p-4 logo"
          placeholder="blur"
          alt="Promotional image of the Change Conference"
        />
        <Image
          src={MollerBil}
          style={{ maxWidth: "200px", height: "auto" }}
          className="p-4 logo"
          placeholder="blur"
          alt="Promotional image of the Change Conference"
        />
        <Image
          src={Digs}
          style={{ maxWidth: "150px", height: "auto" }}
          className="p-4 logo"
          placeholder="blur"
          alt="Promotional image of the Change Conference"
        />
      </div>
    </div>
  );
}
