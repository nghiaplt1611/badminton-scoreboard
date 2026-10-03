import { Activity } from 'lucide-react';

const RacketIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Racket Head */}
    <ellipse cx="16" cy="8" rx="5" ry="6" transform="rotate(45 16 8)" />
    {/* Racket Shaft */}
    <path d="M12.5 11.5l-4 4" />
    {/* Racket Grip */}
    <path d="M5.5 18.5l3-3" strokeWidth="2.5" />
    <path d="M4 20l2-2" strokeWidth="4" />
    {/* Racket Strings */}
    <path d="M15 4.5l2 2M13.5 6l3 3M12 7.5l4 4M17.5 5.5l-2 2M19 7l-3 3M20.5 8.5l-4 4" strokeWidth="0.75" />
    {/* Shuttlecock Feathers */}
    <path d="M2 6l3 2 1-3 1 3 3-2-2 4H4z" />
    {/* Shuttlecock Cork */}
    <path d="M4 10a2 2 0 0 0 4 0" />
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
