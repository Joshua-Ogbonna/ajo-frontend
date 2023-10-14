import React, { ChangeEvent, useContext, useState } from "react";

import styles from "./Profile.module.css";
import { AppContextData } from "@/contexts/AppContext";
import { Spinner, useToast } from "@chakra-ui/react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { confirmTx } from "@/utils/helper";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const { program, profilePDA, connection, connection_status, fetchProfile } =
    useContext(AppContextData);
  const toast = useToast();
  const wallet = useAnchorWallet();

  const createProfile = async () => {
    if (!user.name || !user.email) {
      return toast({
        title: "Error",
        description: "Incomplete user details",
        status: "error",
        isClosable: true,
        duration: 2000,
      });
    }

    setLoading(true);

    try {
      const tx = await program?.methods
        .createProfile(user.name, user.email)
        .accounts({
          profile: profilePDA as PublicKey,
          payer: wallet?.publicKey,
          systemProgram: SystemProgram.programId,
        }).rpc();
      console.log(tx);
      await confirmTx(tx as unknown as string, connection);
      toast({
        title: "Success",
        description: "profile created",
        status: "success",
        isClosable: true,
        duration: 2000,
      });
      fetchProfile()
    } catch (error) {
      console.log(error);
      return toast({
        title: "Error",
        description: "Error creating profile",
        status: "error",
        isClosable: true, 
        duration: 2000,
      });
    } finally {
        setLoading(false)
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.create__profile}>
      <div className={styles.form__group}>
        <div className={styles.form__area}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={user.name}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.form__area}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="johndoe@email.com"
            value={user.email}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.form__area}>
          {!connection_status ? (
            <WalletMultiButton />
          ) : (
            <button onClick={createProfile}>
              {" "}
              {loading ? <Spinner /> : "Create Profile"}{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
