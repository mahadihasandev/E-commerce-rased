import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "./ui/button";

const NoAccess = ({ details = "Please sign in to continue shopping & special offers." }: { details?: string }) => {
  return (
    <div
      className="flex bg-slate-50 items-center justify-center 
         p-4 py-12 md:py-24 rounded-2xl border min-h-[70vh] border-slate-100"
    >
      <Card className="w-full max-w-md p-6 shadow-xl border-slate-100 rounded-3xl bg-white">
        <CardHeader className="flex flex-col items-center">
          <Logo className="w-full" />
          <CardTitle className="text-center text-2xl font-bold mt-4 text-slate-800">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center font-sans font-medium text-slate-600">
            {details}
          </p>
          <Button asChild className="w-full bg-shop_light_blue hover:bg-shop_dark_blue text-white rounded-xl h-11" size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <div className="text-sm text-slate-500 text-center">
            Don&apos;t have an account?
          </div>
          <Button asChild variant="outline" className="w-full rounded-xl h-11 border-slate-200 hover:bg-slate-50" size="lg">
            <Link href="/register">Create an account</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccess;
