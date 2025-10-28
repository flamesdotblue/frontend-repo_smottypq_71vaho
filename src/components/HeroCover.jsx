import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroCover = () => {
  return (
    <section className="relative w-full h-[520px] md:h-[640px] overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-rose-50 to-violet-50">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient and vignette overlays (do not block pointer events) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/60" />
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(60% 60% at 50% 10%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.8) 100%)'
      }} />

      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-6xl px-6 w-full text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 backdrop-blur px-3 py-1 text-xs text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            New: Pastel CRM with 2FA & SSO-ready
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-slate-800">
            Clean Sales CRM for modern teams
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Authenticate securely, manage your users, and move deals forward with a calm, pastel interface designed for focus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroCover;
