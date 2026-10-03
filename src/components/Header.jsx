import { Activity } from 'lucide-react';

const RacketIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="7" y="2" width="10" height="13" rx="5" ry="5" />
    <path d="M12 15v5" />
    <path d="M10 20h4v2h-4z" />
    <path d="M10 5h4" />
    <path d="M9 8h6" />
    <path d="M10 11h4" />
  </svg>
);

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-teal-100 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg shadow-md shadow-teal-200">
              <RacketIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-teal-900 leading-tight">Badminton Tournament</h1>
              <p className="text-xs text-teal-600/80 font-medium">Risk & Payment Advice - Strategy Team 2026</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
