import React, { ChangeEvent, useContext, useState } from "react";

import styles from "./CreatePot.module.css";
import Head from "next/head";
import Navbar from "@/components/Navbar/Navbar";
import { Input, Select, Spinner, useToast } from "@chakra-ui/react";
import { AppContextData } from "@/contexts/AppContext";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { potPDA, vaultPDA } from "@/utils/program";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
import { confirmTx } from "@/utils/helper";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";

const CreatePot = () => {
  const [pot, setPot] = useState({
    name: "",
    description: "",
    cycle: "",
    max_capacity: 0,
    contribution_amount: 0,
  });
  const [loader, setLoader] = useState(false);
  const { program, profilePDA, connection, connection_status } =
    useContext(AppContextData);
  const wallet = useAnchorWallet();
  const toast = useToast();
  const router = useRouter();

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setPot({ ...pot, [e.target.name]: e.target.value });
  };

  const handleCreatePot = async () => {
    console.log(pot);
    if (!Object.values(pot).every((e) => e)) {
      return toast({
        title: "Error",
        description: "Incomplete pot fields",
        status: "error",
        isClosable: true,
        duration: 2000,
      });
    }
    // Check for Program
    if (!program) return;
    // Generate Pot PDA
    const potPD = await potPDA(pot.name, wallet?.publicKey as PublicKey);
    const vaultPD = await vaultPDA(potPD);

    let cycle =
      pot.cycle === "Daily"
        ? { daily: {} }
        : pot.cycle === "Weekly"
        ? { weekly: {} }
        : { month: {} };
    let contribution_amount: BN = new BN(pot.contribution_amount).mul(
      new BN(LAMPORTS_PER_SOL)
    );
    let created_at = Date.now().toString();
    // { daily: {} } | { weekly: {} } | { monthly: {} };
    setLoader(true);
    try {
      const tx = await program.methods
        .createPot(
          pot.description,
          pot.name,
          cycle,
          created_at,
          pot.max_capacity,
          contribution_amount
        )
        .accounts({
          pot: potPD,
          payer: wallet?.publicKey,
          members: profilePDA as PublicKey,
          vault: vaultPD,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      await confirmTx(tx as unknown as string, connection);
      toast({
        title: "Success",
        description: "Pot created successfully",
        status: "success",
        isClosable: true,
        duration: 2000,
      });
      router.push("/app");
    } catch (error) {
      console.log(error);
      return toast({
        title: "Error",
        description: "Error creating pot",
        status: "error",
        isClosable: true,
        duration: 2000,
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Head>
        <title>AjoDAO - Create Pot</title>
      </Head>
      <Navbar />
      <div className={styles.create__pot}>
        <div className={styles.pot__form}>
          <h3>Create Your Pot</h3>

          <div className={styles.form__group}>
            <div className={styles.form__area}>
              <label htmlFor="name">Pot Name</label>
              <Input
                type="text"
                name="name"
                value={pot.name}
                onChange={handleOnChange}
              />
            </div>
            <div className={styles.form__area}>
              <label htmlFor="description">Pot Description</label>
              <textarea
                name="description"
                value={pot.description}
                onChange={handleOnChange}
              ></textarea>
            </div>
            <div className={styles.form__area}>
              <label htmlFor="name">Pot Cycle</label>
              <Select value={pot.cycle} name="cycle" onChange={handleOnChange}>
                <option hidden selected>
                  Select Contribution Cycle
                </option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </Select>
            </div>
            <div className={styles.form__area}>
              <label htmlFor="max_capacity">Maximum Capacity</label>
              <Input
                type="number"
                name="max_capacity"
                value={pot.max_capacity}
                onChange={handleOnChange}
              />
            </div>
            <div className={styles.form__area}>
              <label htmlFor="contribution_amount">
                Contribution Amount (in SOL)
              </label>
              <Input
                type="number"
                name="contribution_amount"
                value={pot.contribution_amount}
                onChange={handleOnChange}
              />
            </div>
            {connection_status ? (
              <button onClick={handleCreatePot}>
                {loader ? <Spinner /> : "Submit Pot"}
              </button>
            ) : (
              <WalletMultiButton />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePot;
