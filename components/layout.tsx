import Alert from "./alert";
import Head from 'next/head'
import Footer from "./footer";
import Meta from "./meta";
import { Fragment, useRef, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import profilePic from "../public/images/tedx.png";
import modalImg from "../public/images/imgmodal.png";
import profilePicLight from "../public/images/tedxwhite.png";
import popup from "../public/images/popup.png";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const navigation = [
  // { name: 'HOME', href: '/' },
  // { name: 'VIDEOS', href: '/about' },
  // { name: "Happening now!", href: "/events/happening" },
  { name: "Events ", href: "/events" },
  { name: "About", href: "/team" },
  { name: "Join Us", href: "/contact" },
];

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    console.log(resolvedTheme);
    setTheme("dark");

    const timeout = setTimeout(() => {
      setOpen(true);
    }, 5000);

    // timeout;
  }, []);

  // const toggleTheme = () => {

  //   if (theme==='light' || resolvedTheme === 'light') {
  //     setTheme('dark');
  //   } else if (theme==='dark' || resolvedTheme === 'dark') {
  //     setTheme('light');
  //   }
  // };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className="bg-white dark:bg-zinc-950 transition-colors duration-700 font-montserrat">
      
      {/* <Transition.Root show={open}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-almost-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  style={{
                    backgroundImage: `url(${popup.src})`, // .src is needed to get the image
                    backgroundSize: "cover",
                    backgroundPositionX: "center",
                    backgroundPositionY: "center",
                    boxShadow: "3px 3px 100px #FFD8FA50",
                    // borderWidth: 1,
                    // borderColor: "#303030",
                  }}
                  className="relative rounded-md shadow-md transform overflow-hidden text-center  transition-all sm:my-8 sm:w-full sm:max-w-lg"
                >
                 
                  <div className=" sm:p-5 text-center  pb-4 pt-5 sm:pb-4">
                    <div className="w-auto h-[240px] flex justify-end">
                      <div
                        className="h-10 w-10 rounded-full z-0 "
                        onClick={() => setOpen(false)}
                      >
                        <XMarkIcon className="text-white cursor-pointer p-1 " />
                      </div>
                    </div>
                    <div className="m-4 flex justify-center text-center sm:items-start">
                      <div>
                        <Dialog.Title className="text-center text-4xl font-semibold text-white">
                         
                        </Dialog.Title>
                        <div className="mt-5 text-center">
                          <p className="text-sm text-gray-300">
                           
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-col px-4 py-3 sm:px-6 flex items-center">
                      <div
                        className="btn justify-center cursor-pointer rounded-sm bg-white px-3 py-2 text-sm text-red-500 font-extrabold shadow-sm hover:bg-neutral-200 border-transparent w-[144px]"
                        onClick={() => (
                          setOpen(false), router.push("/events/happening")
                        )}
                      >
                        Discover now
                      </div>
                     
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root> */}
      <header className="absolute inset-x-0 top-0 z-20 ">
        {/* <Alert preview={preview} /> */}
        <nav
          className={`fixed w-full flex items-center justify-between py-6 px-5 md:px-14   bg-white dark:bg-zinc-900 transition-transform duration-300 ${
            visible ? "translate-y-0" : "-translate-y-full"
          }`}
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href={"/"}>
              <Image
                className="h-8 w-auto"
                src={profilePicLight}
                // src={resolvedTheme=='dark'?profilePicLight:profilePic}
                alt="Picture of the TEDXTrondheim"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                className="h-6 w-6 text-black dark:text-white "
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {/* <p className="mt-4 text-gray-600">Current Theme: {theme}</p> */}
            {/*   <button
        className="p-2 rounded-full bg-gray-800 dark:bg-white "
        onClick={toggleTheme}
      >
        {resolvedTheme === 'light' ?  <MoonIcon className="h-4 w-4 " /> : resolvedTheme === 'dark' ? <SunIcon className="h-4 w-4" /> : <ComputerDesktopIcon className="h-3 w-3" />}
      </button> */}
            {navigation.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-50  hover:text-red-700"
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div> */}
        </nav>
        <Dialog
          as="div"
          className=" lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <Dialog.Panel className="mobileNavigation z-100 fixed inset-y-0 right-0 transform translate-x-0 transition-transform ease-in-out duration-300 w-full overflow-y-auto dark:bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
            <div className="flex items-center justify-between">
              <Link href={"/"} className="-m-1.5 p-1.5">
                <Image
                  className="h-8 w-auto"
                  src={profilePicLight}
                  // src={resolvedTheme=='dark'?profilePicLight:profilePic}
                  alt="Picture of the TEDXTrondheim"

                  // blurDataURL="data:..." automatically provided
                  // placeholder="blur" // Optional blur-up while loading
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon
                  className="h-6 w-6 text-black dark:text-white"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {/* <button
        className="p-2 rounded-full bg-gray-800 dark:bg-white"
        onClick={toggleTheme}
      >
        {resolvedTheme === 'light' ?  <MoonIcon className="h-4 w-4" /> : resolvedTheme === 'dark' ? <SunIcon className="h-4 w-4" /> : <ComputerDesktopIcon className="h-3 w-3" />}
      </button> */}

                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      className="-mx-3 w-full block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600 "
                      onClick={() => {
                        router.push(item.href);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <main>{children}</main>
      <Footer nav={navigation} />
    </div>
  );
}
