import React from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  setSelectedShipmentId,
  setActiveTab,
} from "../../features/shipments/shipmentsSlice";
import Badge from "../ui/Badge";
import styles from "./Overview.module.css";

export default function DelayedAlerts({ shipments }) {
  const dispatch = useAppDispatch();

  // Filter for shipments that require immediate attention (Delayed or Unconfirmed)
  const flaggedShipments = shipments.filter(
    (s) => s.dhlStatus === "Delayed" || s.buyerStatus === "Unconfirmed",
  );

  const handleInspect = (id) => {
    dispatch(setSelectedShipmentId(id));
    dispatch(setActiveTab("shipments"));
  };

  return (
    <div className={styles.sectionCard}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Attention Required</h3>
          <p className={styles.cardSubtitle}>
            Shipments with customs holds or missing buyer receipt
          </p>
        </div>
      </div>

      <div className={styles.alertList}>
        {flaggedShipments.length === 0 ? (
          <p className={styles.cardSubtitle}>
            No issues detected across current active shipments.
          </p>
        ) : (
          flaggedShipments.map((shipment) => (
            <div key={shipment.id} className={styles.alertItem}>
              <div className={styles.alertLeft}>
                <div className={styles.alertHeader}>
                  <span className={styles.alertTitle}>
                    {shipment.buyerName}
                  </span>
                  <Badge status={shipment.dhlStatus} />
                </div>
                <span className={styles.alertDetail}>
                  Waybill: <strong>{shipment.waybill}</strong> &bull;{" "}
                  {shipment.country}
                </span>
                <span className={styles.alertDetail}>
                  Coffee: {shipment.coffeeType}
                </span>
              </div>
              <button
                className={styles.actionButton}
                onClick={() => handleInspect(shipment.id)}
              >
                Inspect
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
