import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/app/CreateProfile/Profile";
import { AppContextData } from "@/contexts/AppContext";
import React, { useContext, useEffect, useState } from "react";

import styles from "./App.module.css";
import { Box } from "@chakra-ui/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import AppHome from "@/components/app/AppHome/AppHome";

const Application = () => {
  const { profile, connection_status } = useContext(AppContextData);

  return (
    <div>
      <Navbar />

      {!connection_status ? (
        <div className={styles.no__connection}>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            flexDirection={"column"}
            gap="20px"
          >
            <Box textAlign="center" marginTop="50px">
              Please connect your wallet
            </Box>
            <WalletMultiButton />
          </Box>
        </div>
      ) : !profile.email ? (
        <Profile />
      ) : (
        <div className={styles.pot__section}>
          <AppHome />
        </div>
      )}
    </div>
  );
};

export default Application;
