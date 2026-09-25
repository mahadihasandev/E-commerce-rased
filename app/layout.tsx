import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} font-sans antialiased text-slate-900 bg-white`}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3500,
            style: {
              background: "#0f172a",
              color: "#fff",
              borderRadius: "12px",
              padding: "12px 18px",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;