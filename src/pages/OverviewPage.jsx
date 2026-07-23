import React from "react";
import { useAppSelector } from "../app/hooks";
import KpiCard from "../components/overview/KpiCard";
import RegionBreakdown from "../components/overview/RegionBreakdown";
import DelayedAlerts from "../components/overview/DelayedAlerts";
import styles from "../components/overview/Overview.module.css";

export default function OverviewPage() {
  const shipments = useAppSelector((state) => state.shipments.items);

  // Derive dynamic metrics from state
  const totalSent = shipments.length;
  const deliveredCount = shipments.filter(
    (s) => s.dhlStatus === "Delivered",
  ).length;
  const delayedCount = shipments.filter(
    (s) => s.dhlStatus === "Delayed",
  ).length;
  const pendingConfirmation = shipments.filter(
    (s) => s.buyerStatus === "Pending" || s.buyerStatus === "Unconfirmed",
  ).length;

  const successRate =
    totalSent > 0 ? Math.round((deliveredCount / totalSent) * 100) : 0;
  const delayRate =
    totalSent > 0 ? Math.round((delayedCount / totalSent) * 100) : 0;
  const unconfirmedRate =
    totalSent > 0 ? Math.round((pendingConfirmation / totalSent) * 100) : 0;

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={styles.pageTitle}>Logistics Overview</h2>
        <p className={styles.pageDescription}>
          Real-time delivery performance and confirmation tracking for global
          coffee sample dispatches.
        </p>
      </div>

      {/* Top Level Metric Cards */}
      <div className={styles.kpiGrid}>
        <KpiCard
          title="Total Dispatched"
          value={totalSent}
          subtitle="Active sample packages"
          trendType="info"
        />

        <KpiCard
          title="Delivery Success Rate"
          value={`${successRate}%`}
          trend="+4.2%"
          trendType="positive"
          subtitle={`${deliveredCount} of ${totalSent} delivered`}
          progress={successRate}
        />

        <KpiCard
          title="Delay / Issue Rate"
          value={`${delayRate}%`}
          trend={delayRate > 0 ? `${delayedCount} held` : "0 issues"}
          trendType={delayRate > 0 ? "negative" : "positive"}
          subtitle="Customs or transit delays"
          progress={delayRate}
        />

        <KpiCard
          title="Unconfirmed Receipts"
          value={pendingConfirmation}
          trend="Action Needed"
          trendType="neutral"
          subtitle="Delivered but no buyer response"
          progress={unconfirmedRate}
        />
      </div>

      {/* Deep Analytics & Alert Feeds */}
      <div className={styles.contentGrid}>
        <RegionBreakdown shipments={shipments} />
        <DelayedAlerts shipments={shipments} />
      </div>
    </div>
  );
}
