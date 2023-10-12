import React, { useState } from "react";
import styles from "./Questions.module.css";

interface FAQItem {
  question: string;
  answer: string;
}

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(index)
  };

  const faqData: FAQItem[] = [
    {
      question: "How are the funds distributed?",
      answer:
        "The pot funds are distributed in a round-robin fashion, ensuring that each participant receives their share.      ",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, AjaDAO prioritizes the security and privacy of its users. Your personal information is encrypted and stored securely.      ",
    },
    {
      question: "How can I earn rewards",
      answer:
        "You can earn rewards by actively participating in AjaDAO, contributing to pots, and engaging with the community.      ",
    },
    {
      question: "Can I withdraw my funds anytime",
      answer:
        "Yes, you can withdraw your funds at any time, subject to the pot's rules and conditions.      ",
    },
    // Add more FAQ items as needed
  ];

  return (
    <div className={styles.questions__module} id="faqs">
      <div>
        {faqData.map((faq, index) => (
          <div key={index} className="faq-question">
            <div
              className={styles.question}
              onClick={() => toggleAccordion(index)}
            >
              {faq.question}
            </div>
            {index === activeIndex && (
              <div className={styles.answer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
