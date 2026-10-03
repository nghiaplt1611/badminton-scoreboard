import { Activity } from 'lucide-react';

const RacketIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Racket */}
    <path d="M19 5A5 6 0 0 0 11.93 12.07L6 18l-2 4 4-2 6-5.93A5 6 0 0 0 19 5z" />
    <path d="M12.5 11.5l3-3" />
    <path d="M14.5 13.5l3-3" />
    <path d="M14 6.5l3 3" />
    <path d="M16 4.5l3 3" />
    {/* Shuttlecock */}
    <path d="M4 4l3 3" />
    <path d="M7 4l-3 3" />
    <circle cx="5.5" cy="5.5" r="1.5" />
    <path d="M4.5 7l-1 2 4 1-1-2" />
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
