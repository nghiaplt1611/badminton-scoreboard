import { Activity } from 'lucide-react';

const Shuttlecock = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L9 8l1 6 2 6 2-6 1-6-3-6z" />
    <path d="M9 8h6" />
    <path d="M10 14h4" />
    <path d="M7 6l3 2" />
    <path d="M17 6l-3 2" />
  </svg>
);

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-lg shadow-md shadow-emerald-200">
              <Shuttlecock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Badminton Tournament</h1>
              <p className="text-xs text-slate-500 font-medium">Risk & Payment Advice - Strategy Team 2026</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
