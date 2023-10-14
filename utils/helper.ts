import { Connection } from "@solana/web3.js"

export const shortenPk = (pk: string, chars = 5) => {
    // const pkStr = typeof pk === "object" ? pk.toBase58() : pk;
    return `${pk.slice(0, chars)}...${pk.slice(-chars)}`
}

export const confirmTx = async (txHash: string, connection: Connection) => {
    const blockhashInfo = await connection.getLatestBlockhash()

    await connection.confirmTransaction({
        blockhash: blockhashInfo.blockhash,
        lastValidBlockHeight: blockhashInfo.lastValidBlockHeight,
        signature: txHash
    })
}

export const mockWallet = () => {
    return {}
}
