import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setSelectedShipmentId,
  sendManualPing,
} from "../../features/shipments/shipmentsSlice";
import { useTheme } from "../../context/ThemeContext";
import Badge from "../ui/Badge";
import styles from "./Shipments.module.css";

import dhlLight from "../../assets/dhl-light.svg";
import dhlDark from "../../assets/dhl-dark.svg";
import emailLight from "../../assets/email-light.svg";
import emailDark from "../../assets/email-dark.svg";

export default function ShipmentDetailModal() {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const selectedId = useAppSelector(
    (state) => state.shipments.selectedShipmentId,
  );
  const items = useAppSelector((state) => state.shipments.items);

  if (!selectedId) return null;

  const shipment = items.find((item) => item.id === selectedId);
  if (!shipment) return null;

  // Dark background needs the bright icon (dhlLight)
  // Light background needs the dark icon (dhlDark)
  const dhlIcon = theme === "dark" ? dhlLight : dhlDark;
  const emailIcon = theme === "dark" ? emailLight : emailDark;

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
          <div className={styles.statusSummaryGrid}>
            <div>
              <span className={styles.fieldLabel}>DHL Status</span>
              <Badge status={shipment.dhlStatus} />
            </div>
            <div>
              <span className={styles.fieldLabel}>Buyer Status</span>
              <Badge status={shipment.buyerStatus} />
            </div>
          </div>

          {/* Coffee specs */}
          <div className={styles.sampleDetailsCard}>
            <span className={styles.sampleDetailsHeader}>Sample Details</span>
            <p className={styles.coffeeTitle}>{shipment.coffeeType}</p>
            <p className={styles.coffeeMeta}>
              Weight: {shipment.weightKg} kg &bull; Dispatched:{" "}
              {shipment.dispatchDate}
            </p>
          </div>

          {/* DHL Tracking Timeline */}
          <div>
            <h4 className={styles.sectionTitle}>
              <img
                src={dhlIcon}
                alt="DHL Logo"
                className={styles.sectionTitleIcon}
              />
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
            <h4 className={styles.sectionTitle}>
              <img
                src={emailIcon}
                alt="Email Icon"
                className={styles.sectionTitleIcon}
              />
              Email Activity & Sync Logs
            </h4>
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
