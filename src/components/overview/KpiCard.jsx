import React from "react";
import styles from "./Overview.module.css";

export default function KpiCard({
  title,
  value,
  subtitle,
  trend,
  trendType = "neutral",
}) {
  return (
    <div className={styles.kpiCard}>
      <span className={styles.kpiTitle}>{title}</span>
      <div className={styles.kpiValueRow}>
        <span className={styles.kpiValue}>{value}</span>
        {trend && (
          <span className={`${styles.kpiTrend} ${styles[trendType]}`}>
            {trend}
          </span>
        )}
      </div>
      {subtitle && <span className={styles.kpiSubtitle}>{subtitle}</span>}
    </div>
  );
}
