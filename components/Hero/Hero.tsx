import React from "react";

import styles from "./Hero.module.css";

const Hero = () => {
  const handleJoinWaitlist = () => {
    if (typeof window !== "undefined") {
      window.open(
        "https://forms.zohopublic.com/ajodao0/form/AjoDAOWaitlist/formperma/J6PCrtvOTFQWd4X41DSc_skXy2-Qp2yzQi-eW67in2c"
      );
    }
  };
  return (
    <div className={styles.hero__module}>
      <h5>AjoDAO: Your Financial Journey, Tailored for Success</h5>
      <h1>Explore AjoDAO, where your financial goals take center stage</h1>
      <p>
        {" "}
        {`Whether it's buying, saving, or investing, our specialized money circles
        are designed to meet your unique needs, delivering the highest returns
        on your savings.`}
      </p>
      <div className={styles.actions}>
        <button onClick={handleJoinWaitlist}>Join Waitlist</button>
        <button>Launch Demo</button>
      </div>

      <div className={styles.spanned}>#1 Thrift App. First On Solana</div>
    </div>
  );
};

export default Hero;
