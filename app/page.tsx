"use client";

import { useRecoilState } from "recoil";
import {
  DataState,
  MenuState,
  ObjectState,
  ThisState,
  UserState,
} from "./components/atoms/atoms";
import Hero_ from "./components/Hero_";
import Feature_ from "./components/Feature_";
import Footer_ from "./components/Footer_";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faPerson, faTimes } from "@fortawesome/free-solid-svg-icons";
import { signIn_ } from "@/firebase";
import { usePathname } from "next/navigation";
import Nav_ from "./components/Nav_";
import Auth_ from "./components/Auth_";

export default function Home() {
  const [object_, setObject_] = useRecoilState(ObjectState);
  const [dataState_, setDataState_] = useRecoilState(DataState);
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Hero_ />
      <Feature_ />
      {/* <Tech_ /> */}
      <Footer_ />
      <Auth_/>
    </main>
  );
}
