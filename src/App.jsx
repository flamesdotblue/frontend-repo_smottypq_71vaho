import React from 'react';
import HeroCover from './components/HeroCover';
import AuthPanel from './components/AuthPanel';
import StatsCards from './components/StatsCards';
import UsersTable from './components/UsersTable';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-300 via-violet-300 to-rose-300" />
          <span className="font-semibold tracking-tight">Pastel CRM</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="#features" className="hover:text-slate-900">Features</a>
          <a href="#users" className="hover:text-slate-900">Users</a>
          <a href="#pricing" className="hover:text-slate-900">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden md:inline-flex rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm hover:bg-slate-50">Sign in</button>
          <button className="inline-flex rounded-xl bg-slate-900 text-white px-3 py-1.5 text-sm hover:bg-slate-800">Get started</button>
        </div>
      </header>

      <main className="space-y-10 md:space-y-14">
        <HeroCover />
        <AuthPanel />
        <StatsCards />
        <UsersTable />
      </main>

      <footer className="mt-10 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Pastel CRM. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-700">Privacy</a>
            <a href="#" className="hover:text-slate-700">Terms</a>
            <a href="#" className="hover:text-slate-700">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
