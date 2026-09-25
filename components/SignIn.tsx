import Link from "next/link";
import { User } from "lucide-react";
import React from "react";

const SignIn = () => {
  return (
    <Link
      href="/login"
      title="Sign In"
      className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors"
    >
      <User className="w-5 h-5 text-shop_dark_blue hover:text-shop_light_blue hoverEffect" />
    </Link>
  );
};

export default SignIn;