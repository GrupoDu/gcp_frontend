"use client";

import { socket } from "@/socket";
import { ProductionOrder } from "@/types/productionOrder.type";
import { useEffect, useState } from "react";

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [productionOrder, setProductionOrder] = useState<ProductionOrder>();

  useEffect(() => {
    socket.on("productionOrder", (data) => {
      setIsConnected(true);
    });

    return () => {
      socket.off("newProductionOrder");
    };
  }, []);
}
