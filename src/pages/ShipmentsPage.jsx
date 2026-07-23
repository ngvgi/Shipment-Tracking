import React from "react";
import ShipmentFilter from "../components/shipments/ShipmentFilter";
import ShipmentTable from "../components/shipments/ShipmentTable";
import ShipmentDetailModal from "../components/shipments/ShipmentDetailModal";
import styles from "../components/shipments/Shipments.module.css";

export default function ShipmentsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Sample Shipment Ledger</h2>
          <p className={styles.pageDescription}>
            Manage coffee sample waybills, track live DHL updates, and review
            buyer communication logs.
          </p>
        </div>
      </div>

      <ShipmentFilter />
      <ShipmentTable />
      <ShipmentDetailModal />
    </div>
  );
}
