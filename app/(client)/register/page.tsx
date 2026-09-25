"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { UserPlus, User, Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();

      if (response.ok && (data.user || data.data?.user || data.token)) {
        const user = data.user || data.data?.user || { id: "1", name, email };
        const token = data.token || data.data?.token || "mock-token";
        login(user, token);
        toast.success("Account created successfully!");
        router.push("/");
      } else {
        if (!response.ok && data.message) {
          toast.error(data.message);
        } else {
          // Demo fallback
          login({ id: "1", name, email }, "dev-token");
          toast.success("Account registered (Demo mode)");
          router.push("/");
        }
      }
    } catch {
      // Offline demo fallback
      login({ id: "1", name, email }, "dev-token");
      toast.success("Account registered (Demo mode)");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20 min-h-[75vh] flex items-center justify-center bg-slate-50/50">
      <Container className="max-w-md w-full">
        <Card className="rounded-3xl border border-slate-100 shadow-xl bg-white p-2">
          <CardHeader className="text-center space-y-2 pb-6">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <UserPlus className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Create an Account
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Join to enjoy personalized shopping, tracking, and rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-shop_light_blue focus:ring-2 focus:ring-shop_light_blue/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-shop_light_blue focus:ring-2 focus:ring-shop_light_blue/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-11 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-shop_light_blue focus:ring-2 focus:ring-shop_light_blue/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-11 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-shop_light_blue focus:ring-2 focus:ring-shop_light_blue/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-shop_light_blue hover:bg-shop_dark_blue text-white font-semibold transition-all mt-2"
              >
                {loading ? "Creating account..." : "Register"}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
            <div>
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-shop_light_blue hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterPage;
