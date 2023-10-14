import { AnchorProvider, BN, Idl, Program, Wallet } from "@project-serum/anchor";
import { PublicKey, LAMPORTS_PER_SOL, Connection, Keypair } from "@solana/web3.js";

import IDL from "./new_idl.json"
import { PROFILE_SEED, POT_SEED, VAULT_SEED, PROGRAM_ID } from "./constants";

export const getProgram = (connection: Connection, wallet: any) => {
    const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed"
    })
    const program = new Program(IDL as Idl, PROGRAM_ID, provider)
    return program
}

export const getProfilePDA = async (k: PublicKey) => {
    return (await PublicKey.findProgramAddressSync([Buffer.from(PROFILE_SEED), k.toBytes()], PROGRAM_ID)[0])
}

export const potPDA = async (name: string, creator: PublicKey) => {
    return (await PublicKey.findProgramAddressSync([Buffer.from(name), creator.toBytes()], PROGRAM_ID)[0])
}

export const vaultPDA = async (potKey: PublicKey) => {
    return (await PublicKey.findProgramAddressSync([Buffer.from(VAULT_SEED), potKey.toBuffer()], PROGRAM_ID)[0])
}