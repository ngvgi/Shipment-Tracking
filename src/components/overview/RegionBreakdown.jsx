import React from "react";
import styles from "./Overview.module.css";

export default function RegionBreakdown({ shipments }) {
  // Aggregate stats per region dynamically from shipments
  const regionStats = shipments.reduce((acc, curr) => {
    const reg = curr.region || "Other";
    if (!acc[reg]) {
      acc[reg] = { total: 0, delivered: 0 };
    }
    acc[reg].total += 1;
    if (curr.dhlStatus === "Delivered") {
      acc[reg].delivered += 1;
    }
    return acc;
  }, {});

  const regions = Object.keys(regionStats);

  return (
    <div className={styles.sectionCard}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Regional Performance</h3>
          <p className={styles.cardSubtitle}>
            Delivery success rate grouped by destination region
          </p>
        </div>
      </div>

      <div className={styles.regionList}>
        {regions.map((region) => {
          const stats = regionStats[region];
          const rate =
            stats.total > 0
              ? Math.round((stats.delivered / stats.total) * 100)
              : 0;

          return (
            <div key={region} className={styles.regionItem}>
              <div className={styles.regionInfo}>
                <span className={styles.regionName}>{region}</span>
                <span className={styles.regionStats}>
                  {stats.delivered}/{stats.total} delivered ({rate}%)
                </span>
              </div>
              <div className={styles.progressBarTrack}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${rate}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
