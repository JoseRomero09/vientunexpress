import { BellRing, Radar, Route, type LucideIcon } from 'lucide-react';
import type { BenefitIcon } from '@/types';
import { site } from '@/lib/data';
import { PhoneMockup } from '@/components/illustrations/PhoneMockup';
import { Reveal } from '@/components/motion/Reveal';
import { TrackShipmentButton } from './TrackShipmentButton';

const benefitIcons: Record<BenefitIcon, LucideIcon> = {
  radar: Radar,
  bell: BellRing,
  route: Route,
};

export function SmartDelivery() {
  const content = site.smartDelivery;

  return (
    <section id="smart-delivery" aria-labelledby="smart-delivery-title" className="overflow-x-clip bg-surface py-20 md:py-24">
      <div className="page-container grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
        {/* Mockup de teléfono sobre círculo amarillo */}
        <Reveal className="flex flex-col items-center gap-6 text-center lg:sticky lg:top-28">
          <span className="rounded-full bg-brand-red px-5 py-1.5 font-heading text-xs font-extrabold tracking-[0.25em] text-white">
            {content.badge}
          </span>
          <p className="font-heading text-2xl font-extrabold tracking-wide text-brand-red lg:text-3xl">{content.tagline}</p>
          <div className="relative mt-4 grid place-items-center">
            <span aria-hidden="true" className="absolute size-72 rounded-full bg-brand-yellow sm:size-80 lg:size-96" />
            <span
              aria-hidden="true"
              className="absolute size-72 translate-x-6 translate-y-4 rounded-full border-4 border-dashed border-brand-red/40 sm:size-80 lg:size-96"
            />
            <PhoneMockup label={content.mockupAlt} className="relative h-[22rem] w-auto drop-shadow-2xl sm:h-[26rem]" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto w-full max-w-2xl lg:max-w-none">
          <h2 id="smart-delivery-title" className="text-3xl font-extrabold text-balance md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-ink-muted">{content.intro}</p>

          <ul className="mt-8 space-y-5">
            {content.benefits.map((benefit) => {
              const Icon = benefitIcons[benefit.icon];
              return (
                <li key={benefit.title} className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-red text-white shadow-md shadow-brand-red/30">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold">{benefit.title}</h3>
                    <p className="text-ink-muted">{benefit.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 rounded-2xl border-l-4 border-brand-yellow bg-surface-warm p-6">
            <h3 className="text-lg font-bold">{content.stepsTitle}</h3>
            <ol className="mt-4 space-y-3">
              {content.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-yellow font-heading text-sm font-extrabold text-ink">
                    {index + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <TrackShipmentButton label={content.cta} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
