import React from "react";
import styles from "./Badge.module.css";

export default function Badge({ status }) {
  if (!status) return null;

  // Normalize string for CSS class matching (e.g. "In Transit" -> "intransit")
  const key = status.toLowerCase().replace(/\s+/g, "");
  const badgeClass = styles[key] || styles.pending;

  return (
    <span className={`${styles.badge} ${badgeClass}`}>
      <span className={styles.dot} />
      {status}
    </span>
  );
}
