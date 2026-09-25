import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData, quickLinksData } from "@/constant/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo className="" />
            <SubText className="">
              Discover tomorrow&apos;s innovations today with AuraShop&apos;s thoughtfully selected
              smart electronics, audio gear, and lifestyle gadgets.
            </SubText>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-slate-200 hover:border-shop_light_blue hover:text-shop_light_blue"
              toolTipClassName="bg-slate-900 text-white"
            />
          </div>
          <div>
            <SubTitle className="">
              Quick Links
              </SubTitle>
              <ul className="space-y-3 mt-4">
                {
                  quickLinksData.map((item)=>(
                    <li key={item?.title}>
                      <Link className="hover:text-shop_light_blue hoverEffect font-medium" href={item?.href}>
                        {item?.title}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            
          </div>
          <div>
             <SubTitle className="">
              Category
              </SubTitle>
              <ul className="space-y-3 mt-4">
                {
                  categoriesData.map((item)=>(
                    <li key={item?.title}>
                      <Link className="hover:text-shop_light_blue hoverEffect font-medium" href={`/category/${item?.href}`}>
                        {item?.title}
                      </Link>
                    </li>
                  ))
                }
              </ul>
          </div>
          <div className="space-y-4">
            <SubTitle className="">
                Newsletter
            </SubTitle>
            <SubText className="mt-1">
              Subscribe to our Newsletter to receive updates and exclusive offer 
            </SubText>
            <form className="space-y-3">
              <Input placeholder="Enter your email" type="email" required/>
              <Button className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="py-6 border-t text-center text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-shop_dark_blue">
              Aura<span className="text-shop_light_blue">Shop</span>
            </span>
            . All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
