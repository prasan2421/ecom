// import React from "react";
// import { GetStaticProps } from "next";
// import {
//   getAllTeamPosts,
//   getAllEventsPosts,
//   getAllHappeningData,
// } from "../../../lib/api";
// import { useEffect, useState, createRef, useRef } from "react";
// import CurrentEventBanner from "../../../components/current-event";

// import ContactBanner from "../../../components/contact-banner";
// import { useRouter } from "next/router";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Link from "next/link";
import { ExternalLink } from "react-external-link";

// import styles from "./styles.module.css";
// import Container from "../../../components/container";

// function happening({ allHappeningData }) {
//   const router = useRouter();

export default function HappeningNow() {
  return (
    <>
      <div className="flex flex-col items-start max-w-[800px] m-auto my-20 p-5">
        <div className="text-black dark:text-white">
          <h1 className="text-3xl my-5">
            TEDxTrondheim presents... Change!
            {/* {allHappeningData.customHappeningField.title} */}
          </h1>
          <p
            className=" text-gray-400"
            // dangerouslySetInnerHTML={{ __html: allHappeningData.content }}
          >
            TEDxTrondheim are glad to announce the Annual Conference 2023! Our
            team have curated a selection of fantastic minds who are keen to
            share ideas worth spreading on the theme of Change, and we cannot
            wait for you to join us. Follow us @tedxtrondheim for more updates!
            #TEDxTrondheim #TEDxTrondheim2023 #ideasworthspreading
            #staycuriousTRD Disclaimer: A production team will be in attendance
            at the conference, with photography and film published on
            TEDxTrondheim Social Media channels and the TEDx YouTube channels
            shortly after the event. TEDxTrondheim reserves the right to use
            this media. Please inform a member of the team at the door if you do
            not consent to your images being used in Social Media publications.
          </p>
        </div>

        <div>
          <div className=" flex justify-center md:justify-end items-center mt-10 md:mt-0 ">
            <ExternalLink href="https://tedxtrondheim.hoopla.no/sales/event/3184811531">
              <button className="bg-white my-10 px-10 py-3 text-red-500 font-bold rounded-sm ">
                Buy tickets
              </button>
            </ExternalLink>
          </div>
        </div>
      </div>
    </>
  );
}

// export default happening;

// export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
//   const allHappeningData = await getAllHappeningData(preview);

//   return {
//     props: { allHappeningData },
//     revalidate: 10,
//   };
// };
