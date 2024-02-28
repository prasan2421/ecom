import React from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import {
  getAllTeamPosts,
  getAllEventsPosts,
  getAllHappeningData,
} from "../../../lib/api";
import { useEffect, useState, createRef, useRef } from "react";
import CurrentEventBanner from "../../../components/current-event";

import ContactBanner from "../../../components/contact-banner";
import { useRouter } from "next/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { ExternalLink } from "react-external-link";

import styles from "./styles.module.css";
import Container from "../../../components/container";

function happening({ allHappeningData }) {
  const router = useRouter();

  return (
    <>
      <CurrentEventBanner />

      <Container>
        <div className="flex flex-col items-start max-w-[500px] m-auto my-20 p-5">
          <div className="text-black dark:text-white">
            <h1 className="text-3xl my-5">
              {allHappeningData.customHappeningField.title}
            </h1>

            <p
              className=" text-gray-400"
              dangerouslySetInnerHTML={{ __html: allHappeningData.content }}
            />
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
      </Container>
    </>
  );
}

export default happening;

export const getServerSideProps: GetServerSideProps = async ({ preview = false }) => {
  const allHappeningData = await getAllHappeningData(preview);

  return {
    props: { allHappeningData },
    // revalidate: 10,
  };
};
