"use client";

import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "Free delivery on all orders over ₹999",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "100% secure payment protection",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "7 days easy return policy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Always here to help you",
  },
];

export default function Services() {
  return (
    <section className="py-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FFF6DA] flex items-center justify-center">
                <Icon className="text-[#D4AF37]" size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {service.title}
              </h3>

              <p className="mt-2 text-gray-500 text-sm">
                {service.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
