import React, { useContext, useState } from "react";
import { BN } from "@project-serum/anchor";

import styles from "./AppHome.module.css";
import { AppContextData } from "@/contexts/AppContext";
import { PublicKey } from "@solana/web3.js";
import { useRouter } from "next/router";
import Head from "next/head";

const AppHome = () => {
  const { profile, pots } = useContext(AppContextData);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>AjoDAO - Pots</title>
      </Head>
      <div className={styles.app__home}>
        <div className={styles.head__home}>
          <h5>Welcome 👋, {profile?.name} </h5>
          <button onClick={() => router.push("/app/create-pot")}>Create A Pot</button>
        </div>

        {/* Pots */}
        <div className={styles.pots}>
          {pots && pots.length > 0 ? (
            pots.map((pot, idx) => (
              <div className={styles.pot} key={idx}>
                <div className={styles.pot__head}>
                  <h5> {pot.account.name} </h5>
                  <div
                    className={`${styles.pot__status} ${
                      Object.keys(pot.account.potStatus).toString() === "open"
                        ? styles.open
                        : Object.keys(pot.account.potStatus).toString() ===
                          "progress"
                        ? styles.progress
                        : ""
                    }`}
                  >
                    {" "}
                    {Object.keys(pot.account.potStatus)
                      .toString()
                      .toUpperCase()}{" "}
                  </div>
                </div>
                <div className={styles.pot__description}>
                  {pot.account.description.slice(0,150)}
                </div>
                <div className={styles.contri__details}>
                  <div>
                    {" "}
                    {pot.account.numOfMembersJoined}/{pot.account.maxCapacity}{" "}
                  </div>
                  <div> {Number(pot.account.contributionAmount)/1000000000} SOL </div>
                </div>
                <div className={styles.pot__action}>
                  <button onClick={() => router.push(`/app/${pot.publicKey}`)}>
                    View Pot
                  </button>
                </div>
              </div>
            ))
          ) : (
            <>No pots available</>
          )}
        </div>
      </div>
    </>
  );
};

export default AppHome;
