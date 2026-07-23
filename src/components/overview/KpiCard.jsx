import React from "react";
import styles from "./Overview.module.css";

export default function KpiCard({
  title,
  value,
  subtitle,
  trend,
  trendType = "neutral", // 'positive' | 'negative' | 'neutral' | 'info'
  progress = null, // e.g., 60 for 60%
}) {
  const cardStyle =
    progress !== null ? { "--progress-width": `${progress}%` } : {};

  return (
    <div
      className={`${styles.kpiCard} ${styles[`card_${trendType}`]}`}
      style={cardStyle}
    >
      <span className={styles.kpiTitle}>{title}</span>
      <div className={styles.kpiValueRow}>
        <span className={`${styles.kpiValue} ${styles[`value_${trendType}`]}`}>
          {value}
        </span>
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
