import React, { useState } from 'react';
import { Lock, Mail, Phone, UserPlus, ShieldCheck } from 'lucide-react';

const Input = ({ label, type = 'text', value, onChange, placeholder }) => (
  <label className="block">
    <span className="text-sm text-slate-600">{label}</span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-800 shadow-sm outline-none ring-0 focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
    />
  </label>
);

const OtpInput = ({ code, setCode }) => {
  const handleChange = (idx, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = code.split('');
    next[idx] = val;
    setCode(next.join(''));
  };
  return (
    <div className="grid grid-cols-6 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          inputMode="numeric"
          maxLength={1}
          value={code[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-white/80 text-center text-lg tracking-widest text-slate-800 shadow-sm focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
        />
      ))}
    </div>
  );
};

const AuthPanel = () => {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('form'); // 'form' | '2fa' | 'success'
  const [otp, setOtp] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setStep('2fa');
  };

  const onVerify = (e) => {
    e.preventDefault();
    if (otp.length === 6) setStep('success');
  };

  return (
    <section className="max-w-6xl mx-auto px-6 -mt-24 md:-mt-28 relative z-20">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white/80 backdrop-blur border border-black/5 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-2 text-slate-700">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <p className="text-sm">2FA enforced for all sign-ins</p>
          </div>
          <div className="mt-4 flex gap-2 p-1 rounded-xl bg-slate-100/70">
            <button
              onClick={() => { setMode('signin'); setStep('form'); }}
              className={`flex-1 rounded-lg px-3 py-2 text-sm transition ${mode === 'signin' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
            >
              Sign in
            </button>
            <button
              onClick={() => { setMode('signup'); setStep('form'); }}
              className={`flex-1 rounded-lg px-3 py-2 text-sm transition ${mode === 'signup' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
            >
              Create account
            </button>
          </div>

          {step === 'form' && (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
              {mode === 'signup' && (
                <Input label="Phone (for 2FA)" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" />
              )}
              <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 text-white font-medium py-2.5 shadow hover:opacity-95 transition flex items-center justify-center gap-2">
                {mode === 'signin' ? (<><Lock className="h-4 w-4" /> Continue</>) : (<><UserPlus className="h-4 w-4" /> Create account</>)}
              </button>
              <p className="text-xs text-slate-500 text-center">By continuing, you agree to our Terms and Privacy Policy.</p>
            </form>
          )}

          {step === '2fa' && (
            <form onSubmit={onVerify} className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="h-4 w-4" />
                <p className="text-sm">Enter the 6‑digit code sent to your phone or email</p>
              </div>
              <OtpInput code={otp} setCode={setOtp} />
              <button type="submit" className="w-full rounded-xl bg-emerald-500 text-white font-medium py-2.5 shadow hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Verify & continue
              </button>
              <button type="button" onClick={() => setStep('form')} className="w-full rounded-xl border border-slate-200 bg-white text-slate-700 font-medium py-2.5 hover:bg-slate-50 transition">
                Back
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="mt-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">You're in!</h3>
              <p className="text-slate-600 text-sm">Welcome back. Explore your dashboard and manage your customers with ease.</p>
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-sky-50 via-violet-50 to-rose-50 border border-black/5 p-6 md:p-8">
          <div className="flex items-center gap-2 text-slate-700">
            <Mail className="h-5 w-5 text-violet-500" />
            <p className="text-sm">Email-first authentication</p>
          </div>
          <div className="mt-6 space-y-4 text-slate-700">
            <h3 className="text-xl font-semibold">Why teams pick our CRM</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Secure authentication with enforced 2FA</li>
              <li>Clean, pastel interface for deep focus</li>
              <li>Blazing fast user search and quick filters</li>
              <li>Simple pagination and bulk actions</li>
            </ul>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: 'Accounts', value: '2.4k' },
                { label: 'Active', value: '1.8k' },
                { label: 'Conversion', value: '34%' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/70 backdrop-blur border border-black/5 p-4 text-center shadow-sm">
                  <div className="text-2xl font-semibold text-slate-800">{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPanel;
