import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BN, Idl, Program } from "@project-serum/anchor";
import {
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  Connection,
} from "@solana/web3.js";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import bs58 from "bs58";

import { getProfilePDA, getProgram, potPDA, vaultPDA } from "../utils/program";
import { confirmTx, mockWallet } from "@/utils/helper";
import { PotT, ProfileT } from "@/types";

interface ContextProps {
  connection_status: boolean;
  profile: ProfileT;
  program: Program<Idl> | undefined;
  profilePDA: PublicKey | null;
  connection: Connection;
  fetchProfile: () => Promise<void>;
  pots: PotT[]
  fetchPots: () => Promise<void>
}

export const AppContextData = createContext<ContextProps>({} as ContextProps);

export const AppContext = ({ children }: { children: ReactNode }) => {
  const [profilePDA, setProfilePDA] = useState<PublicKey | null>(null);
  const [pots, setPots] = useState<PotT[]>([])
  const [profile, setProfile] = useState<ProfileT>({
    num_of_contributions: 0,
    total_amount: 0,
    name: "",
    email: "",
  });
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [mounted, setMounted] = useState(false)

  const program = useMemo(() => {
    if (connection) {
      return getProgram(connection, wallet ?? mockWallet());
    }
  }, [connection, wallet]);

  const fetchProfile = async () => {
    if (!program) return;
    try {
      if (!profilePDA && wallet) {
        const profilePDA = await getProfilePDA(wallet?.publicKey);
        setProfilePDA(profilePDA);
      }

      // Fetch Profile
      const profile = await program.account.profile.fetch(
        profilePDA ?? (await getProfilePDA(wallet?.publicKey as PublicKey))
      );
      setProfile(profile as ProfileT);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPots = useCallback(async () => {
    if (!program) return;

    try {
      const pots = await program.account.pot.all();
      setPots(pots as PotT[])
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, [program]);

  useEffect(() => {
    if (!profile.email) {
      fetchPots();
    }
  }, [program, profile]);

  useEffect(() => {
    fetchProfile();
  }, [program]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true)
    }
  }, [])

  return (
    <AppContextData.Provider
      value={{
        connection_status: wallet?.publicKey ? true : false,
        profile,
        program,
        profilePDA,
        connection,
        fetchProfile,
        pots,
        fetchPots
      }}
    >
      {mounted && children}
    </AppContextData.Provider>
  );
};
