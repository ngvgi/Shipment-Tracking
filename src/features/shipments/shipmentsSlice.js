import { createSlice } from "@reduxjs/toolkit";
import { initialShipments } from "./dummyData";

const initialState = {
  items: initialShipments,
  selectedShipmentId: null,
  activeTab: "overview", // 'overview' | 'shipments'
  filters: {
    search: "",
    dhlStatus: "All",
    buyerStatus: "All",
    region: "All",
  },
};

export const shipmentsSlice = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSelectedShipmentId: (state, action) => {
      state.selectedShipmentId = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    setStatusFilter: (state, action) => {
      const { key, value } = action.payload;
      if (state.filters[key] !== undefined) {
        state.filters[key] = value;
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    sendManualPing: (state, action) => {
      const shipmentId = action.payload;
      const shipment = state.items.find((item) => item.id === shipmentId);
      if (shipment) {
        const now = new Date().toISOString().replace("T", " ").substring(0, 16);
        shipment.lastPingDate = now.split(" ")[0];
        shipment.emailLogs.unshift({
          date: now,
          sender: "System (Manual Ping)",
          type: "Receipt Follow-up",
          preview:
            "Manual follow-up query triggered from Dashboard regarding delivery verification.",
        });
      }
    },
  },
});

export const {
  setActiveTab,
  setSelectedShipmentId,
  setSearchFilter,
  setStatusFilter,
  resetFilters,
  sendManualPing,
} = shipmentsSlice.actions;

export default shipmentsSlice.reducer;
