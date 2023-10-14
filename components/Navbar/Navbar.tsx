import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true)
    }
  }, [])

  return (
    mounted && (
      <div className={styles.navbar__module}>
        <div className={styles.brand}>AjoDAO.</div>

        {router.pathname === "/" ? (
          <div className={styles.mid}>
            <Link href="/">Home</Link>
            <Link href="/#features">Features</Link>
            <Link href="/#faqs">FAQs</Link>
          </div>
        ) : (
          <div className={styles.mid}>
            {mounted ? <WalletMultiButton /> : null}
          </div>
        )}
      </div>
    )
  );
};

export default Navbar;
