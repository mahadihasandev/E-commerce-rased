"use client";

import Container from "@/components/Container";
import useStore from "@/store";
import useAuth from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2Icon, Package2 } from "lucide-react";
import { HiHome } from "react-icons/hi2";
import Link from "next/link";
import { BsShop } from "react-icons/bs";

const SuccessContent = () => {
  const { user } = useAuth();
  const { resetCart } = useStore();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      resetCart();
    }
  }, [sessionId, resetCart]);
  return (
    <Container>
      <div className="py-5 bg-linear-to-br min-h-[70vh] from-shop_light_blue/30 to-shop_light_blue/10 flex items-center justify-center mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 200 }}
          className="bg-white rounded-2xl shadow-2xl p-6 max-w-xl w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-shop_light_blue/30"
          >
            <CheckCircle2Icon className="w-16 h-16 text-green-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-center text-gray-700 mb-8">
            Order confirmed!
          </h1>
          <div className="bg-white p-4 border border-shop_light_blue/30 rounded-lg shadow-lg shadow-shop_light_blue/30 space-y-4 text-center">
            <p className="text-center text-gray-600">
              Thank you for your order! We are processing your order and will
              notify you once it ships.
            </p>
            <p>
              Your order number is:{" "}
              <span className="font-semibold">{orderNumber}</span>
            </p>
            {user?.email && (
              <p>
                A confirmation email has been sent to:{" "}
                <span className="font-semibold">{user.email}</span>
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/"
              className="flex hoverEffect items-center justify-center gap-2 font-semibold px-6 py-3 mt-6 rounded-lg text-white bg-shop_dark_blue/70 hover:bg-shop_dark_blue/90 transition-colors"
            >
              <HiHome className="w-5 h-5" />
              home
            </Link>
            <Link
              href={"/shop"}
              className="flex hoverEffect items-center justify-center gap-2 font-semibold px-6 py-3 mt-6 rounded-lg text-white bg-shop_dark_blue/70 hover:bg-shop_dark_blue/90 transition-colors"
            >
              <BsShop className="w-5 h-5" />
              shop
            </Link>
            <Link
              href={`/order`}
              className="flex hoverEffect items-center justify-center gap-2 font-semibold px-6 py-3 mt-6 rounded-lg text-white bg-shop_dark_blue/70 hover:bg-shop_dark_blue/90 transition-colors"
            >
              <Package2 className="w-5 h-5" />
              View order
            </Link>
          </div>
        </motion.div>
      </div>
    </Container>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
};

export default SuccessPage;
