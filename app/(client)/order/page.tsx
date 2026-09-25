"use client";

import Container from "@/components/Container";
import OrdersComponent from "@/components/OrdersComponent";
import NoAccess from "@/components/NoAccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getOrder } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { Order } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TbFileXFilled } from "react-icons/tb";

const OrderPage = () => {
  const { user, isSignedIn } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      getOrder(String(user.id))
        .then((data) => setOrders(data || []))
        .catch((err) => console.error("Failed to load orders:", err))
        .finally(() => setLoading(false));
    }
  }, [user?.id]);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-shop_light_blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <Container className="py-10">
        <NoAccess details="Please sign in to view your order history." />
      </Container>
    );
  }

  return (
    <div>
      <Container className="py-10">
        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-shop_light_blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders?.length ? (
          <Card className="w-full shadow-md shadow-shop_light_blue/30">
            <CardHeader>
              <CardTitle className="font-sans">My Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] font-semibold md:w-auto">
                        Order Number
                      </TableHead>
                      <TableHead className="hidden font-semibold md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="font-semibold">Customer</TableHead>
                      <TableHead className="hidden font-semibold sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="font-semibold">Total</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="hidden font-semibold sm:table-cell">
                        Invoice Number
                      </TableHead>
                      <TableHead className="text-center font-semibold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <OrdersComponent orders={orders} />
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col shadow-md shadow-red-400 rounded-md items-center justify-center h-[calc(100dvh-8rem)] py-12 px-4 sm:px-6 lg:px-8">
            <TbFileXFilled className="h-24 w-24 text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900">
              No orders found
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
              It looks like you haven&apos;t placed any orders yet. Start
              shopping to see your orders here!
            </p>
            <Button asChild className="mt-6">
              <Link href="/">Browse Products</Link>
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default OrderPage;