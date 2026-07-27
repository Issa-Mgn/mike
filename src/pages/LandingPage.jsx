import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import ExampleShowcase from '../components/landing/ExampleShowcase';
import FAQ from '../components/landing/FAQ';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <ExampleShowcase />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
