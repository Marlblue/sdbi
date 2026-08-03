import StickyHeader from './components/StickyHeader';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import PartnerBadges from './components/PartnerBadges';
import Portfolio from './components/Portfolio';
import FounderProfile from './components/FounderProfile';
import Gallery from './components/Gallery';
import Transformation from './components/Transformation';
import Testimonials from './components/Testimonials';
import CTAForm from './components/CTAForm';
import MediaCoverage from './components/MediaCoverage';
import FAQ from './components/FAQ';
import Articles from './components/Articles';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <StickyHeader />
      <main>
        <Hero />
        <TrustedBy />
        <WhyChooseUs />
        <Services />
        <PartnerBadges />
        <Portfolio />
        <FounderProfile />
        <Gallery />
        <Transformation />
        <Testimonials />
        <CTAForm />
        <MediaCoverage />
        <FAQ />
        <Articles />
      </main>
      <Footer />
    </div>
  );
}
