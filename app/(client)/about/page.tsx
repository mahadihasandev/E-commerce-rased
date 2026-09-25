import Container from "@/components/Container";
import React from "react";
import { Mail, MapPin, Phone, User } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-shop_light_bg h-full py-10 ">
      <Container className=" mx-auto shadow-md shadow-shop_light_blue/20 py-10">
        {/* Header Section */}
        <div className="text-center mb-10 space-y-4 ">
          <h2 className="text-3xl font-bold text-shop_dark_blue">
            About Aurashop
          </h2>
          <p className="text-lightColor max-w-2xl mx-auto leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold  text-shop_dark_blue">Aurashop</span>
            , your premier destination for quality products and exceptional
            service. We are dedicated to providing you with the best shopping
            experience, focusing on dependability, customer service, and
            uniqueness. Founded in 2024 by Mahadi Hasan, Aurashop has come a
            long way from its beginnings in Ashulia. We hope you enjoy our
            products as much as we enjoy offering them to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Info Card */}
          <div className="bg-white rounded-2xl p-8 shadow-md shadow-shop_light_blue/20 flex flex-col justify-center space-y-6 hover:shadow-lg hover:shadow-shop_light_blue/30 hoverEffect border border-shop_light_blue/10">
            <h3 className="text-2xl font-semibold text-shop_dark_blue mb-2">
              Visit Our Store
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-shop_light_blue/10 rounded-full text-shop_light_blue group-hover:bg-shop_light_blue group-hover:text-white hoverEffect">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-sm text-lightColor font-medium uppercase tracking-wide">
                    Owner / Founder
                  </p>
                  <p className="text-lg font-semibold text-darkColor">
                    Mahadi Hasan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-shop_light_blue/10 rounded-full text-shop_light_blue group-hover:bg-shop_light_blue group-hover:text-white hoverEffect">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-lightColor font-medium uppercase tracking-wide">
                    Headquarters
                  </p>
                  <p className="text-lg font-semibold text-darkColor leading-snug">
                    Ashulia, Savar,
                    <br /> Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-shop_light_blue/10 rounded-full text-shop_light_blue group-hover:bg-shop_light_blue group-hover:text-white hoverEffect">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-lightColor font-medium uppercase tracking-wide">
                    Contact Number
                  </p>
                  <p className="text-lg font-semibold text-darkColor">
                    01735696417
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-shop_light_blue/10 rounded-full text-shop_light_blue group-hover:bg-shop_light_blue group-hover:text-white hoverEffect">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-lightColor font-medium uppercase tracking-wide">
                    Support Email
                  </p>
                  <p className="text-lg font-semibold text-darkColor break-all">
                    arnob4all@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-2xl p-3 shadow-md shadow-shop_light_blue/20 hover:shadow-lg hover:shadow-shop_light_blue/30 hoverEffect border border-shop_light_blue/10 h-[400px] md:h-auto overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14594.227914092498!2d90.31697245366517!3d23.86981504953926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c21ad66dc88d%3A0xe543ef816dc8c88c!2sAshulia%2C%20Savar%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1708871234567!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-shop_dark_blue mb-8">
            Built With Modern Technology
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Next.js 16", desc: "React Framework" },
              { name: "TypeScript", desc: "Type Safety" },
              { name: "Tailwind CSS", desc: "Modern Styling" },
              { name: "PHP / Laravel", desc: "RESTful API Backend" },
              { name: "Laravel Auth", desc: "Authentication" },
              { name: "Stripe", desc: "Payment Gateway" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="bg-white p-6 rounded-xl shadow-md shadow-shop_light_blue/10 hover:shadow-lg hover:shadow-shop_light_blue/20 hoverEffect border border-shop_light_blue/10 flex flex-col items-center justify-center gap-2 group"
              >
                <p className="font-semibold text-shop_dark_blue group-hover:text-shop_light_blue hoverEffect">
                  {tech.name}
                </p>
                <p className="text-xs text-lightColor">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
