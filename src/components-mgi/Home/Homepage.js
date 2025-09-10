import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../images/MGI logo.png';

// Single-file HomePage + Header + small UI components
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // replace with real auth

  const toggleAuth = () => setIsLoggedIn(!isLoggedIn);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const pricingPlans = [
    {
      id: 'basic',
      title: 'Starter',
      price: '$15',
      freq: '/mo',
      bullets: [
        'Daily free-lite signals',
        'Access to short lessons',
        'Trading psychology checklist',
      ],
      accent: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'pro',
      title: 'Pro',
      price: '$49',
      freq: '/mo',
      bullets: [
        'Full signals (NYC session)',
        'Weekly live review & journal access',
        'Risk management templates',
      ],
      accent: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'elite',
      title: 'Elite',
      price: '$99',
      freq: '/mo',
      bullets: [
        '1:1 coaching (monthly)',
        'Priority signals + alerts',
        'Full course access',
      ],
      accent: 'from-yellow-500 to-orange-500',
    },
  ];

  const testimonials = [
    {
      name: 'Amina',
      quote:
        'MGI changed my trading — psychology training stopped me from revenge trading. Signals are clear and on-time.',
    },
    {
      name: 'John',
      quote: 'Consistent pips after 2 months. The journal and checklist keep me disciplined.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="backdrop-blur-md bg-white/40 border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            {/* Logo & Title */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="MGI" className="h-10 w-10 object-contain" />
              <div>
                <h1 className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  MGI Candles
                </h1>
                <p className="text-xs text-gray-600">Trading psychology · Signals · Journals</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6 items-center">
              <Link to="/" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/trades" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
                Trades
              </Link>
              <Link to="/membership" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
                Membership
              </Link>
              <Link to="/lessons" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
                Lessons
              </Link>
              <Link to="/journal" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
                Journal
              </Link>

              {!isLoggedIn ? (
                <>
                  <Link to="/free-signals" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full font-medium hover:opacity-95 transition">
                    Get Free Signals
                  </Link>
                  <Link to="/signup" className="bg-white/80 border border-indigo-500 text-indigo-600 px-4 py-2 rounded-full font-medium hover:bg-indigo-50 transition">
                    Join Premium
                  </Link>
                </>
              ) : (
                <button onClick={toggleAuth} className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition">
                  Sign Out
                </button>
              )}
            </nav>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-gray-800">
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden px-4 pb-4 space-y-3 backdrop-blur-lg bg-white/80">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-gray-800 font-medium hover:text-indigo-600">
                Home
              </Link>
              <Link to="/trades" onClick={() => setMobileMenuOpen(false)} className="block text-gray-800 font-medium hover:text-indigo-600">
                Trades
              </Link>
              <Link to="/membership" onClick={() => setMobileMenuOpen(false)} className="block text-gray-800 font-medium hover:text-indigo-600">
                Membership
              </Link>
              <Link to="/lessons" onClick={() => setMobileMenuOpen(false)} className="block text-gray-800 font-medium hover:text-indigo-600">
                Lessons
              </Link>

              {!isLoggedIn ? (
                <>
                  <Link to="/free-signals" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full font-medium">
                    Get Free Signals
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center bg-white/80 border border-indigo-500 text-indigo-600 px-4 py-2 rounded-full font-medium">
                    Join Premium
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    toggleAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-center bg-red-600 text-white px-4 py-2 rounded-full font-medium"
                >
                  Sign Out
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Content wrapper with top padding to avoid header overlap */}
      <main className="pt-28">
        {/* HERO */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Master the NY Session · Trade with Confidence</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-xl">
                Signals powered by psychology-first trading. Learn discipline, manage risk, and get NYC-session setups you can act on — daily.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/free-signals" className="inline-block bg-white/90 border border-indigo-300 px-5 py-3 rounded-full font-semibold hover:shadow-lg transition">
                  Get Free Signals
                </Link>
                <Link to="/membership" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-full font-semibold hover:opacity-95 transition">
                  Join Premium — $15/mo
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                <StatCard title="Avg Weekly Pips" value="+120" />
                <StatCard title="Win Rate" value="71%" />
                <StatCard title="Members" value="1.2k+" />
              </div>
            </div>

            {/* Signal preview / visual */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-white/40 shadow-md">
              <h3 className="font-semibold">Today's Free Peek</h3>
              <SignalPreview />
              <p className="mt-4 text-sm text-gray-600">Want full signals + entry/exit & journal? Upgrade to Pro.</p>
            </div>
          </div>
        </section>

        {/* Why MGI - branding pillars */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h3 className="text-2xl font-bold">Why traders pick MGI</h3>
          <p className="mt-2 text-gray-600 max-w-2xl">We place psychology first — because mindset + rules = consistency.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <PillarCard title="Trading Psychology" desc="Checklists, routines, and coaching to keep your emotions out of the trade." icon="🧠" />
            <PillarCard title="Signals (NYC)" desc="Clear, time-based entries tested on NYC session price action." icon="📈" />
            <PillarCard title="Risk Management" desc="Position sizing, stop placement, and funded account ready strategies." icon="🔒" />
          </div>
        </section>

        {/* Lessons & Journal CTA */}
        <section className="bg-white/60 border-t border-b py-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold">Learn the psychology that wins</h3>
              <p className="mt-3 text-gray-600">Short lessons, video snippets, and downloadable checklists built around discipline and decision-making.</p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>• How to avoid revenge trading</li>
                <li>• Routine for pre-trade checks</li>
                <li>• Journal templates that reveal edge</li>
              </ul>

              <div className="mt-6 flex gap-3">
                <Link to="/lessons" className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-md font-semibold">Start Learning</Link>
                <Link to="/journal" className="inline-block border border-indigo-300 px-5 py-3 rounded-md font-semibold">Open Journal</Link>
              </div>
            </div>

            <div className="rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white border border-white/30 shadow-sm">
              <h4 className="font-semibold">Featured Lesson</h4>
              <p className="mt-2 text-sm text-gray-600">"Stop Loss Discipline" — short video + checklist</p>
              <div className="mt-4 h-40 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-500">Video thumbnail placeholder</div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold">What traders say</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="p-6 rounded-lg bg-white border shadow-sm">
                <p className="text-gray-700">“{t.quote}”</p>
                <footer className="mt-4 text-sm text-gray-500">— {t.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Plans */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl font-bold">Membership plans</h3>
            <p className="mt-2 text-gray-600">Simple plans built around signals, psychology and mentorship.</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((p) => (
                <PricingCard key={p.id} plan={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="rounded-2xl p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg flex flex-col md:flex-row items-center justify-between">
            <div>
              <h4 className="text-xl font-bold">Your mindset is your trading edge.</h4>
              <p className="mt-1 text-sm opacity-90">Start mastering psychology + signals today and trade with discipline.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/signup" className="inline-block bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold">Get Started</Link>
            </div>
          </div>
        </section>

        {/* Footer spacer */}
        <div className="h-24" />
      </main>
    </div>
  );
}


/* ----- Small subcomponents (kept in-file for easy copy-paste) ----- */

function StatCard({ title, value }) {
  return (
    <div className="bg-white/80 rounded-xl p-4 shadow-sm border">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 font-bold text-lg">{value}</div>
    </div>
  );
}

function SignalPreview() {
  // Replace with real chart or image component later
  return (
    <div className="mt-4 rounded-lg border bg-white p-4">
      <div className="font-medium">EUR/USD — 1H</div>
      <div className="mt-2 text-sm text-gray-600">Setup: Break & retest / NYC time entry</div>
      <div className="mt-3 h-36 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">Chart placeholder</div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <div>Entry: 1.0870</div>
        <div>TP: 1.0900</div>
        <div>SL: 1.0840</div>
      </div>
    </div>
  );
}

function PillarCard({ icon, title, desc }) {
  return (
    <div className="p-6 rounded-xl bg-white border shadow-sm">
      <div className="text-2xl">{icon}</div>
      <h4 className="mt-3 font-semibold">{title}</h4>
      <p className="mt-2 text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

function PricingCard({ plan }) {
  return (
    <div className="rounded-2xl p-6 border bg-white shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-lg">{plan.title}</h4>
          <div className="text-sm text-gray-500">Popular</div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-extrabold">{plan.price}<span className="text-base font-medium">{plan.freq}</span></div>
          <ul className="mt-4 text-sm text-gray-700 space-y-2">
            {plan.bullets.map((b, i) => (
              <li key={i}>• {b}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <Link to={`/checkout/${plan.id}`} className={`inline-block w-full text-center px-4 py-2 rounded-lg font-semibold bg-gradient-to-r ${plan.accent} text-white`}>
          Choose {plan.title}
        </Link>
      </div>
    </div>
  );
}
