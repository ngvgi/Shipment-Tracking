import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSelectedShipmentId } from "../../features/shipments/shipmentsSlice";
import Badge from "../ui/Badge";
import styles from "./Shipments.module.css";

export default function ShipmentTable() {
  const dispatch = useAppDispatch();
  const { items, filters } = useAppSelector((state) => state.shipments);

  // Apply search query and status filters
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.buyerName.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.country.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.coffeeType.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.waybill.toLowerCase().includes(filters.search.toLowerCase());

    const matchesDhl =
      filters.dhlStatus === "All" || item.dhlStatus === filters.dhlStatus;
    const matchesRegion =
      filters.region === "All" || item.region === filters.region;

    return matchesSearch && matchesDhl && matchesRegion;
  });

  return (
    <div className={styles.tableCard}>
      {/* DESKTOP VIEW: MASTER DATA TABLE */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Buyer / Recipient</th>
            <th>Sample Coffee</th>
            <th>Waybill #</th>
            <th>Region</th>
            <th>DHL Status</th>
            <th>Buyer Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "32px",
                  color: "var(--color-text-muted)",
                }}
              >
                No shipments found matching the selected filters.
              </td>
            </tr>
          ) : (
            filteredItems.map((item) => (
              <tr
                key={item.id}
                onClick={() => dispatch(setSelectedShipmentId(item.id))}
              >
                <td>
                  <div className={styles.buyerCell}>
                    <span className={styles.buyerName}>{item.buyerName}</span>
                    <span className={styles.buyerEmail}>
                      {item.contactEmail}
                    </span>
                  </div>
                </td>
                <td>
                  {item.coffeeType} ({item.weightKg}kg)
                </td>
                <td>
                  <span className={styles.waybillText}>{item.waybill}</span>
                </td>
                <td>
                  {item.country} ({item.region})
                </td>
                <td>
                  <Badge status={item.dhlStatus} />
                </td>
                <td>
                  <Badge status={item.buyerStatus} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* MOBILE VIEW: TOUCH CARD STREAM */}
      <div className={styles.mobileCardStream}>
        {filteredItems.length === 0 ? (
          <div className={styles.noResultsMobile}>
            No shipments found matching the selected filters.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={styles.mobileShipmentCard}
              onClick={() => dispatch(setSelectedShipmentId(item.id))}
            >
              <div className={styles.mobileCardHeader}>
                <div className={styles.buyerCell}>
                  <span className={styles.buyerName}>{item.buyerName}</span>
                  <span className={styles.buyerEmail}>{item.contactEmail}</span>
                </div>
                <span className={styles.waybillText}>{item.waybill}</span>
              </div>

              <div className={styles.mobileCardBody}>
                <div className={styles.mobileDetailRow}>
                  <span className={styles.mobileDetailLabel}>Coffee:</span>
                  <span className={styles.mobileDetailValue}>
                    {item.coffeeType} ({item.weightKg}kg)
                  </span>
                </div>
                <div className={styles.mobileDetailRow}>
                  <span className={styles.mobileDetailLabel}>Region:</span>
                  <span className={styles.mobileDetailValue}>
                    {item.country} ({item.region})
                  </span>
                </div>
              </div>

              <div className={styles.mobileCardFooter}>
                <div className={styles.statusBadgeGroup}>
                  <Badge status={item.dhlStatus} />
                  <Badge status={item.buyerStatus} />
                </div>
                <span className={styles.tapIndicator}>Details →</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
