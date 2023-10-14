import Navbar from "@/components/Navbar/Navbar";
import { AppContextData } from "@/contexts/AppContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Head from "next/head";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { BiCalendar, BiDollar, BiFlag, BiUser } from "react-icons/bi";

import styles from "./Pot.module.css";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { potPDA, vaultPDA } from "@/utils/program";
import { PotAccount } from "@/types";
import { Icon, Spinner, useToast } from "@chakra-ui/react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { confirmTx } from "@/utils/helper";

const Pot = () => {
  const params = useParams();
  const { connection_status, program, profilePDA, connection } =
    useContext(AppContextData);
  const [loader, setLoader] = useState<string | null>(null);
  const [singlePot, setSinglePot] = useState<PotAccount>({} as PotAccount);
  const wallet = useAnchorWallet();
  const toast = useToast();

  const getPotPDA = async () => {
    try {
      if (params && singlePot.name !== undefined) {
        const pot = await potPDA(singlePot.name, singlePot.creator);
        return pot;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleJoinPot = async () => {
    const pot = await getPotPDA();
    const vault = await vaultPDA(pot as PublicKey);

    setLoader("join-pot");
    try {
      const tx = await program?.methods
        .joinPot(singlePot.name, singlePot.creator)
        .accounts({
          pot,
          payer: wallet?.publicKey,
          members: profilePDA as PublicKey,
          vault,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log(tx);
      await confirmTx(tx as unknown as string, connection);
      toast({
        title: "Success",
        description: "Joined pot successfully",
        status: "success",
        isClosable: true,
        duration: 2000,
      });
      fetchPot()
    } catch (error) {
      console.log(error);
      return toast({
        title: "Error",
        description: "Error joining pot",
        status: "error",
        isClosable: true,
        duration: 2000,
      });
    } finally {
      setLoader(null);
    }
  };

  const fetchPot = async () => {
    setLoader("fetch-pot");
    try {
      if (params) {
        const pot = await program?.account.pot.fetch(
          params?.id as unknown as PublicKey
        );
        console.log(pot);
        setSinglePot(pot as PotAccount);
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoader(null);
    }
  };

  useEffect(() => {
    if (!program) return;
    if (params) {
      fetchPot();
    }
  }, [params]);

  useEffect(() => {
    if (singlePot.name !== undefined) {
      getPotPDA();
    }
  }, [singlePot.name]);

  return (
    <>
      <Head>
        <title>AjoDAO - {singlePot?.name} </title>
      </Head>
      <Navbar />
      {/* {loader === "fetch-pot" ? <Spinner margin={"50px"} /> : null} */}
      {loader === "fetch-pot" ? (
        <Spinner margin={"50px"} />
      ) : !connection_status ? (
        <div className={styles.pot__module}>
          <WalletMultiButton />
        </div>
      ) : (
        singlePot !== null && (
          <div className={styles.pot__module}>
            <div className={styles.head}>
              <div>
                <h5> {singlePot.name} </h5>
                <div className={styles.pot__details}>
                  <div>
                    {" "}
                    <Icon as={BiUser} /> {singlePot.numOfMembersJoined}{" "}
                  </div>
                  <div>
                    {" "}
                    <Icon as={BiDollar} />{" "}
                    {Number(singlePot.contributionAmount)/1000000000} SOL{" "}
                  </div>
                  <div>
                    {" "}
                    <Icon as={BiFlag} />{" "}
                    {singlePot &&
                      singlePot.potStatus &&
                      Object.keys(singlePot.potStatus)}{" "}
                  </div>
                  <div>
                    {" "}
                    <Icon as={BiCalendar} /> {singlePot.createdAt}{" "}
                  </div>
                </div>
              </div>
              <button onClick={handleJoinPot}>
                {loader === "join-pot" ? (
                  <Spinner />
                ) : singlePot &&
                  singlePot.members &&
                  singlePot.members.some((e) => e.toBase58() === wallet?.publicKey.toBase58()) ? (
                  "Member"
                ) : (
                  "Join Pot"
                )}
              </button>
            </div>

            <div className={styles.description}>
              <h5>Description</h5>
              <p>{singlePot.description}</p>
            </div>

            <div className={styles.terms}>
              <h3>Pot Rules</h3>
              <div className={styles.rules}>
                <div className={styles.pre}>
                  By participating in {singlePot.name} pot, you agree to the
                  following terms and conditions:
                </div>
                <div>
                  <h5>Eligibility:</h5>
                  <p>
                    To join an AjoDAO pot, you must be of legal age in your
                    jurisdiction.
                  </p>
                  <p>
                    AjoDAO pots are open to individuals and entities, subject to
                    applicable laws and regulations.
                  </p>
                </div>
                <div>
                  <h5>Voluntary Participation:</h5>
                  <p>
                    Your participation in an AjoDAO pot is entirely voluntary.
                  </p>
                </div>
                <div>
                  <h5>Pot Contributions:</h5>{" "}
                  <p>
                    You agree to make regular contributions to the pot as
                    specified in the pot's rules.
                  </p>{" "}
                  <p>
                    Contributions must be made on time and in accordance with
                    the pot's payment schedule.
                  </p>
                </div>
                <div>
                  <h5>Pot Rules:</h5>{" "}
                  <p>
                    You must adhere to the rules and guidelines of the specific
                    pot you join, as established by the pot creator.
                  </p>
                </div>
                <div>
                  <h5>Withdrawals:</h5>{" "}
                  <p>
                    You can request to withdraw your contributions and earnings
                    in accordance with the pot's rules. - Withdrawals may be
                    subject to fees or penalties as specified in the pot's
                    rules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Pot;
