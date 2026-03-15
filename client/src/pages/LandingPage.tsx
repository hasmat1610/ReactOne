import { useEffect, lazy, Suspense } from 'react'

const HeroSection = lazy(() => import('../components/landing/HeroSection'))
const BentoFeatures = lazy(() => import('../components/landing/BentoFeatures'))
const BuildAnythingSection = lazy(() => import('../components/landing/BuildAnythingSection'))
const FAQSection = lazy(() => import('../components/landing/FAQSection'))
const ExploreGuidesPhysics = lazy(() => import('../components/landing/ExploreGuidesPhysics'))
const TestimonialsSection = lazy(() => import('../components/landing/TestimonialsSection'))
const SkillsSection = lazy(() => import('../components/landing/SkillsSection'))

const SectionSkeleton = () => (
  <div className="w-full h-[400px] bg-black/20 animate-pulse rounded-3xl" />
)

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
        <Suspense fallback={<div className="h-screen" />}>
          <HeroSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <BentoFeatures />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<div className="h-[400px]" />}>
          <ExploreGuidesPhysics />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <BuildAnythingSection />
        </Suspense>

        {/* <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </Suspense> */}

        <Suspense fallback={<SectionSkeleton />}>
          <FAQSection />
        </Suspense>
      </div>
    </div>
  )
}

