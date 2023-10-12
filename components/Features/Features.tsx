import React from "react";

import styles from "./Features.module.css";

const features = [
  {
    title: "Decentralized and Trustless",
    feature:
      "AjaDAO operates on the Solana blockchain, ensuring decentralization and eliminating the need for intermediaries.",
  },
  {
    title: "Community Governance",
    feature:
      "AjaDAO is governed by its community members, allowing for collective decision-making and ensuring fairness.",
  },
  {
    title: "Secure and Auditable",
    feature:
      "All transactions and pot activities are recorded on the Solana blockchain, providing transparency and security.",
  },
  {
    title: "Native Token Rewards",
    feature:
      "Earn native tokens by actively participating in AjaDAO and contributing to the growth of the community.",
  },
];

const Features = () => {
  return (
    <div className={styles.features__module} id="#features">
      <div className={styles.head}>
        <h3>Designed to help you earn.</h3>
        <p>
          At AjoDAO, our suite of powerful features is purposefully crafted to
          enhance your financial journey
        </p>
      </div>

      {/* Features */}
      <div className={styles.features}>
        {features.map((feature, idx) => (
          <div className={styles.feature} key={idx}>
            <div className={styles.feature__head}>
              <div className={styles.head__outer}>
                <div className={styles.head__inner}>{idx + 1}</div>
              </div>
            </div>

            <div className={styles.feature__body}>
              <h5> {feature.title} </h5>
              <p> {feature.feature} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
