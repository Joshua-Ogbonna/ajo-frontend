import React from 'react'

import styles from "./Navbar.module.css"
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className={styles.navbar__module}>
        <div className={styles.brand}>
            AjoDAO.
        </div>

        <div className={styles.mid}>
            <Link href="/">Home</Link>
            <Link href="/#features">Features</Link>
            <Link href="/#faqs">FAQs</Link>
        </div>

        {/* <button>
            Launch App
        </button> */}
    </div>
  )
}

export default Navbar