import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setSearchFilter,
  setStatusFilter,
} from "../../features/shipments/shipmentsSlice";
import styles from "./Shipments.module.css";

export default function ShipmentFilter() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.shipments.filters);

  return (
    <div className={styles.toolbar}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search buyer, country, coffee type, waybill..."
        value={filters.search}
        onChange={(e) => dispatch(setSearchFilter(e.target.value))}
      />

      <div className={styles.filterGroup}>
        <select
          className={styles.filterSelect}
          value={filters.dhlStatus}
          onChange={(e) =>
            dispatch(
              setStatusFilter({ key: "dhlStatus", value: e.target.value }),
            )
          }
        >
          <option value="All">All DHL Statuses</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Delayed">Delayed</option>
        </select>

        <select
          className={styles.filterSelect}
          value={filters.region}
          onChange={(e) =>
            dispatch(setStatusFilter({ key: "region", value: e.target.value }))
          }
        >
          <option value="All">All Regions</option>
          <option value="Europe">Europe</option>
          <option value="Asia-Pacific">Asia-Pacific</option>
          <option value="North America">North America</option>
        </select>
      </div>
    </div>
  );
}
