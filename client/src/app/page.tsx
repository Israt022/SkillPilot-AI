import HeroSection from "@/component/home/HeroSection";
import StatsSection from "@/component/home/StatsSection";
import FeaturesSection from "@/component/home/FeaturesSection";
import CategoriesSection from "@/component/home/CategoriesSection";
import HowItWorksSection from "@/component/home/HowItWorksSection";
import TestimonialsSection from "@/component/home/TestimonialsSection";
import BlogSection from "@/component/home/BlogSection";
import FAQSection from "@/component/home/FAQSection";
import NewsletterSection from "@/component/home/NewsletterSection";
import CTASection from "@/component/home/CTASection";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* 1. Hero — Slider, 65vh, animated */}
      <HeroSection />

      {/* 2. Stats — Animated counters */}
      <StatsSection />

      {/* 3. Features — 6 feature cards */}
      <FeaturesSection />

      {/* 4. Categories — 8 skill categories */}
      <CategoriesSection />

      {/* 5. How It Works — 3-step process */}
      <HowItWorksSection />

      {/* 6. Testimonials — Infinite marquee */}
      <TestimonialsSection />

      {/* 7. Blog — 3 resource cards */}
      <BlogSection />

      {/* 8. FAQ — Animated accordion */}
      <FAQSection />

      {/* 9. Newsletter — Email capture */}
      <NewsletterSection />

      {/* 10. Final CTA */}
      <CTASection />
    </main>
  );
}
