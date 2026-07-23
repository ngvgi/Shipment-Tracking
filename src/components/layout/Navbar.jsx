import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setActiveTab } from "../../features/shipments/shipmentsSlice";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.shipments.activeTab);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}>☕</div>
          <div>
            <h1 className={styles.brandTitle}>Coffee Logistics</h1>
            <span className={styles.brandSubtitle}>
              Global Sample Delivery & Tracking
            </span>
          </div>
        </div>

        <div className={styles.rightActions}>
          <nav className={styles.nav}>
            <button
              className={`${styles.navButton} ${activeTab === "overview" ? styles.active : ""}`}
              onClick={() => dispatch(setActiveTab("overview"))}
            >
              Overview
            </button>
            <button
              className={`${styles.navButton} ${activeTab === "shipments" ? styles.active : ""}`}
              onClick={() => dispatch(setActiveTab("shipments"))}
            >
              Sample Ledger
            </button>
          </nav>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
