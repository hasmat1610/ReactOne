import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      question: "Is this course suitable for beginners?",
      answer: "While we cover advanced topics, the curriculum is structured to take you from the fundamentals to expert level. Basic JavaScript knowledge is recommended."
    },
    {
      question: "What technologies are covered?",
      answer: "We cover the entire modern React ecosystem including React 18, Redux Toolkit, TanStack Query, React Hook Form, Zod, and Vite."
    },
    {
      question: "Do I get lifetime access to the materials?",
      answer: "Yes, once enrolled, you have lifetime access to all current video courses, interactive playgrounds, and future updates to the curriculum."
    },
    {
      question: "Is there a community or support available?",
      answer: "Absolutely! You get access to our exclusive Discord community where you can ask questions, share projects, and learn from mentors and peers."
    },
    {
      question: "Are the projects based on real-world scenarios?",
      answer: "Yes, every module culminates in a real-world project. You won't just learn theory; you'll build functional applications that look great on your portfolio."
    },
    {
      question: "Do you offer refunds if I'm not satisfied?",
      answer: "We offer a 30-day money-back guarantee. If you decide the platform isn't right for you within the first 30 days, we'll issue a full refund."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Frequently asked questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between font-medium cursor-pointer list-none p-5 text-foreground/90 hover:text-white transition-colors">
                  <span>{faq.question}</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </span>
                </summary>
                <div className="text-muted-foreground px-5 pb-5 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-muted-foreground text-sm">
          Still have questions? Email us at <a href="mailto:support@reactone.dev" className="text-primary hover:underline">support@reactone.dev</a>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
