import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    subtitle: "Dhaka, Bangladesh",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    title: "Call Us",
    subtitle: "+880 1735 696417",
    icon: <Phone className="h-5 w-5" />,
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    title: "Email Us",
    subtitle: "arnob4all@gmail.com",
    icon: <Mail className="h-5 w-5" />,
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-6 border-b border-slate-100">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/70 hover:bg-white border border-transparent hover:border-slate-200/80 hover:shadow-md hover:shadow-slate-100 transition-all duration-300 group"
        >
          <div className="p-3 rounded-xl bg-blue-50 text-shop_light_blue group-hover:bg-shop_light_blue group-hover:text-white transition-colors duration-300 shrink-0">
            {item.icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm text-slate-900 group-hover:text-shop_light_blue transition-colors duration-200">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;