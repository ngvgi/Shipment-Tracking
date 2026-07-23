import React from "react";
import { useAppSelector } from "./app/hooks";
import Navbar from "./components/layout/Navbar";
import OverviewPage from "./pages/OverviewPage";
import ShipmentsPage from "./pages/ShipmentsPage";

export default function App() {
  const activeTab = useAppSelector((state) => state.shipments.activeTab);

  return (
    <div>
      <Navbar />
      <main style={{ flex: 1 }}>
        {activeTab === "overview" ? <OverviewPage /> : <ShipmentsPage />}
      </main>
    </div>
  );
}
