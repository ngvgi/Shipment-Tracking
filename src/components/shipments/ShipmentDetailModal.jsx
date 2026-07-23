import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setSelectedShipmentId,
  sendManualPing,
} from "../../features/shipments/shipmentsSlice";
import Badge from "../ui/Badge";
import styles from "./Shipments.module.css";

export default function ShipmentDetailModal() {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(
    (state) => state.shipments.selectedShipmentId,
  );
  const items = useAppSelector((state) => state.shipments.items);

  if (!selectedId) return null;

  const shipment = items.find((item) => item.id === selectedId);
  if (!shipment) return null;

  return (
    <div
      className={styles.drawerBackdrop}
      onClick={() => dispatch(setSelectedShipmentId(null))}
    >
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.drawerHeader}>
          <div>
            <h3 className={styles.drawerTitle}>{shipment.buyerName}</h3>
            <p className={styles.drawerSub}>
              Waybill: {shipment.waybill} &bull; {shipment.country}
            </p>
          </div>
          <button
            className={styles.closeButton}
            onClick={() => dispatch(setSelectedShipmentId(null))}
          >
            &times;
          </button>
        </div>

        <div className={styles.drawerBody}>
          {/* Status summary */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                  display: "block",
                }}
              >
                DHL Status
              </span>
              <Badge status={shipment.dhlStatus} />
            </div>
            <div>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                  display: "block",
                }}
              >
                Buyer Status
              </span>
              <Badge status={shipment.buyerStatus} />
            </div>
          </div>

          {/* Coffee specs */}
          <div
            style={{
              background: "var(--color-bg)",
              padding: "14px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-border)",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Sample Details
            </span>
            <p style={{ fontWeight: 600, marginTop: "2px" }}>
              {shipment.coffeeType}
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
              Weight: {shipment.weightKg} kg &bull; Dispatched:{" "}
              {shipment.dispatchDate}
            </p>
          </div>

          {/* DHL Tracking Timeline */}
          <div>
            <h4 className={styles.sectionTitle}>
              DHL Express Tracking Timeline
            </h4>
            <div className={styles.timeline}>
              {shipment.dhlTimeline.map((event, idx) => (
                <div key={idx} className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineStatus}>{event.status}</div>
                  <div className={styles.timelineMeta}>
                    {event.location} &bull; {event.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email activity log */}
          <div>
            <h4 className={styles.sectionTitle}>Email Activity & Sync Logs</h4>
            <div className={styles.emailList}>
              {shipment.emailLogs.map((log, idx) => (
                <div key={idx} className={styles.emailCard}>
                  <div className={styles.emailMeta}>
                    <span className={styles.emailSender}>{log.sender}</span>
                    <span>{log.date}</span>
                  </div>
                  <div className={styles.emailPreview}>{log.preview}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.drawerFooter}>
          <button
            className={styles.pingButton}
            onClick={() => dispatch(sendManualPing(shipment.id))}
          >
            Send Manual Receipt Ping
          </button>
        </div>
      </div>
    </div>
  );
}
