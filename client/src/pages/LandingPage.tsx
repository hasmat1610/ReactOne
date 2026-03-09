import { useEffect } from 'react'
import BentoFeatures from '../components/landing/BentoFeatures'
import BuildAnythingSection from '../components/landing/BuildAnythingSection'
import FAQSection from '../components/landing/FAQSection'
import HardStuffSection from '../components/landing/HardStuffSection'
import HeroSection from '../components/landing/HeroSection'
import IntegrationsSection from '../components/landing/IntegrationsSection'
import ScaleSection from '../components/landing/ScaleSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'

export default function LandingPage() {
  useEffect(() => {
    document.body.classList.add(
      'bg-[#0B0D10]',
      'text-[#E9EEF5]',
      'antialiased',
      'selection:bg-primary/30',
    )
    return () => {
      document.body.classList.remove(
        'bg-[#0B0D10]',
        'text-[#E9EEF5]',
        'antialiased',
        'selection:bg-primary/30',
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0B0D10] font-sans text-[#E9EEF5] overflow-x-hidden">
      <div className="relative pt-16">
        <HeroSection />
        <BentoFeatures />
        <HardStuffSection />
        <ScaleSection />
        <IntegrationsSection />
        <BuildAnythingSection />
        <TestimonialsSection />
        <FAQSection />
      </div>
    </div>
  )
}

