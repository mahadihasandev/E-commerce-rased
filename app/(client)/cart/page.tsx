"use client";

import {
  CreateCheckOutSessions,
  Metadata,
} from "@/Actions/CreateCheckOutSessions";
import AddToWishListButton from "@/components/AddToWishListButton";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButton from "@/components/QuantityButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Address } from "@/types";
import { useAddresses } from "@/hooks/useQueries";
import { urlFor } from "@/lib/image";
import useStore from "@/store";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiShoppingCart } from "react-icons/gi";
import { RiDeleteBin2Line } from "react-icons/ri";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubtotalPrice,
    resetCart,
  } = useStore();

  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItem());
  const { isSignedIn, user } = useAuth();
  const { data: addresses = [] } = useAddresses();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddress = addresses.find((addr: Address) => addr.default);
      setSelectedAddress(defaultAddress || addresses[0]);
    }
  }, [addresses, selectedAddress]);

  const handleResetCart = () => {
    const confirm = window.confirm("Are you sure you want to reset your cart?");
    if (confirm) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.name ?? "Customer",
        customerEmail: user?.email ?? "customer@example.com",
        userId: user?.id ? String(user.id) : undefined,
        addresses: selectedAddress,
      };
      const checkOutUrl = await CreateCheckOutSessions(groupedItems, metadata);
      console.log(checkOutUrl);

      if (checkOutUrl) {
        window.location.href = checkOutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error(`Failed to create checkout session: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-shop_light_blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5 shadow mb-2 pl-1 rounded-lg">
                <GiShoppingCart
                  size={30}
                  className="text-2xl text-text-darkColor/90"
                />
                <h1 className="text-2xl font-sans font-bold text-darkColor/90">
                  Shopping Cart
                </h1>
              </div>
              <div className="grid md:grid-cols-3 md:gap-8">
                <div className="md:col-span-2 lg:col-span-2 rounded-lg">
                  <div
                    className="border border-shop_light_blue/20 bg-shop_light_bg rounded-lg shadow-md 
                shadow-shop_light_blue/30"
                  >
                    {groupedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="border-b shadow-md p-2.5 
                      last:border-b-0 flex items-center justify-between gap-5"
                        >
                          <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="border p-0.5 rounded-md md:p-1 mr-2 shadow-md overflow-hidden group"
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="ProductImage"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-32 object-cover h-32 md:h-40 md:w-40 group-hover:scale-105 hoverEffect"
                                />
                              </Link>
                            )}
                            <div className="h-full flex flex-1 flex-col justify-between py-1">
                              <div className="flex flex-col gap-0.5 md:gap-1.5">
                                <h2 className="text-base line-clamp-1 font-semibold">
                                  {product?.name}
                                </h2>
                                <p className="text-sm capitalize">
                                  Variant:{" "}
                                  <span className="font-semibold">
                                    {product?.variant}
                                  </span>
                                </p>
                                <p className="text-sm capitalize">
                                  Status:{" "}
                                  <span className="font-semibold">
                                    {product?.status}
                                  </span>
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <AddToWishListButton
                                        className="h-10 w-10"
                                        product={product}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold font-sans">
                                      <p>Add to favorite</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <RiDeleteBin2Line
                                        onClick={() => {
                                          deleteCartProduct(product?._id);
                                          toast.success(
                                            "Product removed from cart",
                                          );
                                        }}
                                        className="h-7 text-red-400  hover:text-red-600 hover:scale-105 hoverEffect w-7"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold text-red-300">
                                      Remove from cart
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                          <div
                            className="flex flex-col items-start 
                        justify-between h-36 md:h-44 p-0.5 md:p-1"
                          >
                            <PriceFormatter
                              amount={(product?.price as number) * itemCount}
                              className="text-lg font-bold font-sans text-darkColor/80"
                            />
                            <QuantityButton product={product} className="" />
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      variant="destructive"
                      onClick={handleResetCart}
                      className="m-5 font-semibold ml-[80%] lg:ml-[88%] md:ml-[85%] hover:scale-105"
                    >
                      Reset
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="lg:col-span-1">
                    <div
                      className="hidden md:inline-block w-full border border-shop_light_blue/20 bg-shop_light_bg p-6 rounded-lg shadow-md 
                  shadow-shop_light_blue/30"
                    >
                      <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                      </h2>
                      <div className="space-y-4 border-t pt-2">
                        <div className="flex items-center justify-between font-sans">
                          <span>SubTotal:</span>
                          <PriceFormatter
                            className="font-sans"
                            amount={getSubtotalPrice()}
                          />
                        </div>
                        <div className="flex items-center justify-between border-b pb-2 font-sans">
                          <span>Discount:</span>
                          <PriceFormatter
                            className="font-sans"
                            amount={getTotalPrice() - getSubtotalPrice()}
                          />
                        </div>

                        <div className="flex items-center justify-between font-semibold text-lg">
                          <span>Total:</span>
                          <PriceFormatter
                            className="font-sans text-darkColor text-lg font-bold"
                            amount={useStore?.getState().getTotalPrice()}
                          />
                        </div>
                        <Button
                          size="lg"
                          className="w-full rounded-full 
                      font-semibold tracking-wider 
                      hover:scale-105 mt-4"
                          onClick={handleCheckout}
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "Proceed to Checkout"}
                        </Button>
                      </div>
                    </div>

                    {addresses.length > 0 && (
                      <div
                        className="border border-shop_light_blue/20 bg-shop_light_bg rounded-lg shadow-md 
                  shadow-shop_light_blue/30 my-3"
                      >
                        <Card className="bg-shop_light_bg shadow-none border-none">
                          <CardHeader>
                            <CardTitle className="pb-3">
                              Delivery Address
                            </CardTitle>
                            <CardContent>
                              <RadioGroup
                                defaultValue={
                                  addresses?.find((addr) => addr.default)?._id?.toString() || ""
                                }
                              >
                                {addresses?.map((address, index) => {
                                  const addrId = address?._id?.toString() || String(index);
                                  return (
                                    <div
                                      key={addrId}
                                      onClick={() => setSelectedAddress(address)}
                                      className={`flex items-center space-x-2 mb-4 
                                  cursor-pointer ${selectedAddress?._id === address._id && "text-shop_light_blue"}`}
                                    >
                                      <RadioGroupItem value={addrId} />
                                      <Label
                                        htmlFor={`address-${addrId}`}
                                        className="grid gap-1.5 flex-1"
                                      >
                                        <span className="font-semibold">
                                          {address?.name}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                          {address.address},{address.city},{" "}
                                          {address.city},{address.zip},{" "}
                                          {address.District}
                                        </span>
                                      </Label>
                                    </div>
                                  );
                                })}
                              </RadioGroup>
                              <Button
                                variant="outline"
                                className="w-full rounded-full hover:bg-shop_light_blue/20 font-sans mt-4"
                              >
                                Add New Address
                              </Button>
                            </CardContent>
                          </CardHeader>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>

                {/* for smart phone */}
                <div className="md:hidden bottom-0 w-full bg-shop_light_bg pt-2 mt-1">
                  {addresses && (
                    <div
                      className="border border-shop_light_blue/20 bg-shop_light_bg rounded-lg shadow-md 
                  shadow-shop_light_blue/30 my-3"
                    >
                      <Card className="bg-shop_light_bg shadow-none border-none">
                        <CardHeader>
                          <CardTitle className="pb-3">
                            Delivery Address
                          </CardTitle>
                          <CardContent>
                            <RadioGroup
                              defaultValue={
                                addresses?.find((addr) => addr.default)?._id?.toString() || ""
                              }
                            >
                              {addresses?.map((address, index) => {
                                const addrId = address?._id?.toString() || String(index);
                                return (
                                  <div
                                    key={addrId}
                                    onClick={() => setSelectedAddress(address)}
                                    className={`flex items-center space-x-2 mb-4 
                                cursor-pointer ${selectedAddress?._id === address._id && "text-shop_light_blue"}`}
                                  >
                                    <RadioGroupItem value={addrId} />
                                    <Label
                                      htmlFor={`address-mob-${addrId}`}
                                      className="grid gap-1.5 flex-1"
                                    >
                                      <span className="font-semibold">
                                        {address?.name}
                                      </span>
                                      <span className="text-sm text-gray-600">
                                        {address.address},{address.city},{" "}
                                        {address.city},{address.zip},{" "}
                                        {address.District}
                                      </span>
                                    </Label>
                                  </div>
                                );
                              })}
                            </RadioGroup>
                            <Button
                              variant="outline"
                              className="w-full rounded-full hover:bg-shop_light_blue/20 font-sans mt-4"
                            >
                              Add New Address
                            </Button>
                          </CardContent>
                        </CardHeader>
                      </Card>
                    </div>
                  )}
                </div>

                <div className="sticky md:hidden bottom-0 w-full bg-shop_light_bg pt-2">
                  <div
                    className="border-shop_light_blue/20 bg-shop_light_bg px-6 py-3 rounded-lg shadow-md border 
                  shadow-shop_light_blue/30"
                  >
                    <h2 className="text-md font-semibold mb-2">
                      Order Summary
                    </h2>
                    <div className="space-y-2 border-t pt-1">
                      <div className="flex items-center justify-between font-sans">
                        <span className="text-md">SubTotal:</span>
                        <PriceFormatter
                          className="font-sans text-md"
                          amount={getSubtotalPrice()}
                        />
                      </div>
                      <div className="flex items-center justify-between border-b pb-1 font-sans">
                        <span className="text-md">Discount:</span>
                        <PriceFormatter
                          className="font-sans text-md"
                          amount={getTotalPrice() - getSubtotalPrice()}
                        />
                      </div>

                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-md">Total:</span>
                        <PriceFormatter
                          className="font-sans text-darkColor text-md font-bold"
                          amount={useStore?.getState().getTotalPrice()}
                        />
                      </div>
                      <Button
                        size="lg"
                        className="w-full rounded-full 
                      font-semibold tracking-wider 
                      hover:scale-105 mt-1"
                        onClick={handleCheckout}
                      >
                        {loading ? "Loading..." : "Proceed to Checkout"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <Container>
          <NoAccess />
        </Container>
      )}
    </div>
  );
};

export default CartPage;
