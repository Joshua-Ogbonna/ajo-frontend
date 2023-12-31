import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Questions from "@/components/Questions/Questions";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Features from "@/components/Features/Features";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>AjoDAO</title>
        <meta
          name="description"
          content="🌐 First Solana thrift DApp! Pool funds, invest wisely, and save with Ajo Defi"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar />
        <Hero />
        <Features />

        <Questions />
        <Footer />
      </div>
    </>
  );
}
