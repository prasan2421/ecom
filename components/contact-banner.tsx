import { useRouter } from "next/router";
import { useTheme } from "next-themes";

import Link from "next/link";

export default function ContactBanner() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-white px-10 py-10">
      <div className="flex flex-1 flex-col md:text-left text-m text-gray-900 dark:text-slate-900">
        <p className="font-semibold" style={{ maxWidth: "495px" }}>
          Do you want to volunteer, be a partner or just simply contact us for
          more? Let us know!
        </p>
      </div>

      <div className=" flex flex-1 justify-center md:justify-end items-center mt-10 md:mt-0 ">
        <button
          className="bg-red-500 px-10 py-3 text-white rounded-sm font-semibold"
          onClick={() => router.push("/contact")}
        >
          Contact Us
        </button>
        {/* <button className="border-solid border-2 border-red-500   px-10 py-3 text-red-500 rounded-lg" onClick={()=> router.push('/contact') }>Contact us</button> */}
      </div>
    </div>
  );
}
