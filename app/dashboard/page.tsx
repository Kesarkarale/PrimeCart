"use client";

import Hero from "@/components/dashboard/hero";
import CategorySection from "@/components/dashboard/category-section";
import FeaturedProducts from "@/components/dashboard/featured-products";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";
import Services from "@/components/dashboard/services";
import Footer from "@/components/layout/footer";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#faf8f3] dark:bg-[#050505] transition-colors">

      <Navbar />
      <TopBar />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6 space-y-8">

        {/* Hero */}
        <section className="rounded-3xl overflow-hidden shadow-lg">
          <Hero />
        </section>

        {/* Categories */}
        <section className="rounded-3xl bg-white dark:bg-[#0d0d0d] shadow-sm border border-[#ececec] dark:border-[#222] p-6">
          <CategorySection />
        </section>

        {/* Featured Products */}
        <section className="rounded-3xl bg-white dark:bg-[#0d0d0d] shadow-sm border border-[#ececec] dark:border-[#222] p-6">
          <FeaturedProducts />
        </section>

        {/* Services */}
        <section className="rounded-3xl bg-white dark:bg-[#0d0d0d] shadow-sm border border-[#ececec] dark:border-[#222] p-2">
          <Services />
        </section>

      </div>

      <Footer />

    </main>
  );
}
