import { PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";

interface UserProfile {
  publickKey: PublicKey;
  profile: ProfileT;
}

interface ProfileT {
  num_of_contributions: number;
  total_amount: number;
  name: String;
  email: String;
}

interface PotT {
  publicKey: PublicKey;
  account: PotAccount;
}

interface PotAccount {
  creator: PublicKey;
  totalAmount: BN;
  description: string;
  name: string;
  cycle: {
    weekly: Record<string, any>;
  };
  createdAt: string;
  vaultBump: number;
  potStatus: {
    open: Record<string, any>;
  };
  maxCapacity: number;
  contributionAmount: BN;
  numOfMembersJoined: number;
  members: PublicKey[];
}

/**
 * 
 * {
    "creator": "GPx8ZRUZhpSPw1wkS6BgV1Gbxyc9U43JTGMmDppskxgH",
    "totalAmount": "00",
    "description": "Today",
    "name": "Life is good",
    "cycle": {
        "weekly": {}
    },
    "createdAt": "October 13",
    "vaultBump": 254,
    "potStatus": {
        "open": {}
    },
    "maxCapacity": 5,
    "contributionAmount": "0a",
    "numOfMembersJoined": 2,
    "members": [
        "GPx8ZRUZhpSPw1wkS6BgV1Gbxyc9U43JTGMmDppskxgH",
        "Fxr4khAVScYiGXT764NGLGYMTAzZRtq2Ew5dvQsHBPDR"
    ]
}
 */
