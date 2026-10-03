import { calculateMatchWinner } from '../utils/helpers';
import { differenceInMinutes, parse, isValid } from 'date-fns';
import { Clock, Trophy } from 'lucide-react';

export default function Matches({ matches, players, onUpdateMatch }) {
  
  const getPlayerNames = (playerIds) => {
    if (!playerIds || !Array.isArray(playerIds)) return [];
    return playerIds.map(id => players.find(p => p.id === id)?.name || 'Unknown');
  };

  const handleScoreChange = (matchId, field, value, currentMatch) => {
    const numValue = value === '' ? 0 : parseInt(value, 10);
    onUpdateMatch(matchId, field, numValue);
    
    // Auto calculate winner if score changes
    const scoreA = field === 'score_a' ? numValue : currentMatch.score_a || 0;
    const scoreB = field === 'score_b' ? numValue : currentMatch.score_b || 0;
    
    const winner = calculateMatchWinner(scoreA, scoreB);
    if (winner !== currentMatch.winner) {
      onUpdateMatch(matchId, 'winner', winner);
    }
  };

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return null;
    const start = parse(startTime, 'HH:mm', new Date());
    const end = parse(endTime, 'HH:mm', new Date());
    if (isValid(start) && isValid(end)) {
      return differenceInMinutes(end, start);
    }
    return null;
  };

  const handleTimeChange = (matchId, field, value, currentMatch) => {
    onUpdateMatch(matchId, field, value);
    
    const startTime = field === 'start_time' ? value : currentMatch.start_time;
    const endTime = field === 'end_time' ? value : currentMatch.end_time;
    
    const duration = calculateDuration(startTime, endTime);
    if (duration !== null && duration !== currentMatch.duration_minutes) {
      onUpdateMatch(matchId, 'duration_minutes', duration);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          Lịch thi đấu (Mô phỏng Sân cầu lông)
        </h2>
        <p className="text-sm text-slate-500 font-medium">Chạm 21 điểm sẽ kết thúc</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => {
          const namesA = getPlayerNames(match.team_a_players);
          const namesB = getPlayerNames(match.team_b_players);

          return (
            <div key={match.id} className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden transition-transform hover:-translate-y-1 duration-300 flex flex-col">
              {/* Header: Trận & Vòng (Outside court) */}
              <div className="flex justify-between items-center px-4 py-2.5 bg-slate-50 border-b border-slate-100 text-slate-600 text-[11px] font-bold tracking-wider uppercase">
                <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5 text-indigo-500" /> Trận {match.match_id}</span>
                <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">Vòng {match.round_number}</span>
              </div>

              {/* Sân đấu (Court Area) */}
              <div className="relative bg-[#1e885c] h-48 flex-shrink-0">
                {/* Sân đấu (Court Lines) - Tỉ lệ chuẩn */}
                <div className="absolute inset-2 border-2 border-white pointer-events-none rounded-sm opacity-90">
                  {/* Đường biên dọc đánh đơn (Singles side lines) - Cách mép ngoài ~7.5% */}
                  <div className="absolute left-0 right-0 top-[7.5%] bottom-[7.5%] border-y-2 border-white pointer-events-none"></div>
                  
                  {/* Đường giao cầu dài đánh đôi (Doubles long service lines) - Cách mép sau ~5.7% */}
                  <div className="absolute top-0 bottom-0 left-[5.7%] border-l-2 border-white pointer-events-none"></div>
                  <div className="absolute top-0 bottom-0 right-[5.7%] border-r-2 border-white pointer-events-none"></div>
                  
                  {/* Đường giao cầu ngắn (Short service lines) - Cách lưới ~14.8%, cách mép sau ~35.2% */}
                  <div className="absolute top-0 bottom-0 left-[35.2%] border-l-2 border-white pointer-events-none"></div>
                  <div className="absolute top-0 bottom-0 right-[35.2%] border-r-2 border-white pointer-events-none"></div>
                  
                  {/* Đường chia đôi sân trái/phải (Center lines) */}
                  <div className="absolute top-1/2 left-0 w-[35.2%] border-t-2 border-white pointer-events-none"></div>
                  <div className="absolute top-1/2 right-0 w-[35.2%] border-t-2 border-white pointer-events-none"></div>
                  
                  {/* Lưới (Net) */}
                  <div className="absolute top-[-4px] bottom-[-4px] left-1/2 -translate-x-1/2 w-1.5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiPjwvcmVjdD4KPHBhdGggZD0iTTAgMEw0IDRaTTAgNEw0IDBaIiBzdHJva2U9InJnYmEoMCwwLDAsMC4zKSIgc3Ryb2tlLXdpZHRoPSIwLjUiPjwvcGF0aD4KPC9zdmc+')] pointer-events-none z-0 border-l border-r border-white/80 shadow-md"></div>
                </div>

                <div className="relative z-10 flex h-full items-center">
                  {/* Team A Side */}
                  <div className="flex-1 flex flex-col items-center justify-center px-2">
                    <div className="text-white font-bold text-center mb-3 drop-shadow-md flex flex-col gap-1">
                      {namesA.map((name, i) => (
                        <span key={i} className="bg-blue-900/70 px-2.5 py-0.5 rounded-full text-sm backdrop-blur-sm border border-blue-400/30">{name}</span>
                      ))}
                    </div>
                    <input 
                      type="number"
                      min="0"
                      className="w-16 h-16 text-center font-black text-3xl rounded-xl bg-white/95 text-blue-700 border-2 border-blue-500/20 focus:border-blue-500 focus:ring-blue-500 shadow-xl transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none m-0"
                      value={match.score_a ?? ''}
                      onChange={(e) => handleScoreChange(match.id, 'score_a', e.target.value, match)}
                    />
                  </div>

                  {/* Team B Side */}
                  <div className="flex-1 flex flex-col items-center justify-center px-2">
                    <div className="text-white font-bold text-center mb-3 drop-shadow-md flex flex-col gap-1">
                      {namesB.map((name, i) => (
                        <span key={i} className="bg-rose-900/70 px-2.5 py-0.5 rounded-full text-sm backdrop-blur-sm border border-rose-400/30">{name}</span>
                      ))}
                    </div>
                    <input 
                      type="number"
                      min="0"
                      className="w-16 h-16 text-center font-black text-3xl rounded-xl bg-white/95 text-rose-700 border-2 border-rose-500/20 focus:border-rose-500 focus:ring-rose-500 shadow-xl transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none m-0"
                      value={match.score_b ?? ''}
                      onChange={(e) => handleScoreChange(match.id, 'score_b', e.target.value, match)}
                    />
                  </div>
                </div>
              </div>

              {/* Footer: Time & Status (Outside court) */}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center mt-auto">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <input 
                    type="time"
                    className="text-[11px] font-medium rounded-md bg-white text-slate-700 border border-slate-200 py-1 px-1.5 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-[68px] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={match.start_time || ''}
                    onChange={(e) => handleTimeChange(match.id, 'start_time', e.target.value, match)}
                  />
                  <span className="text-slate-400 text-xs">-</span>
                  <input 
                    type="time"
                    className="text-[11px] font-medium rounded-md bg-white text-slate-700 border border-slate-200 py-1 px-1.5 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-[68px] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={match.end_time || ''}
                    onChange={(e) => handleTimeChange(match.id, 'end_time', e.target.value, match)}
                  />
                  {match.duration_minutes != null && (
                    <span className="text-[10px] font-bold text-emerald-700 ml-1 bg-emerald-100 px-1.5 py-0.5 rounded-full border border-emerald-200">
                      {match.duration_minutes}p
                    </span>
                  )}
                </div>
                
                <div>
                  {match.winner === 'A' && <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-100 text-blue-700 border border-blue-200 shadow-sm">Đội A Thắng</span>}
                  {match.winner === 'B' && <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-100 text-rose-700 border border-rose-200 shadow-sm">Đội B Thắng</span>}
                </div>
              </div>
            </div>
          );
        })}
        {matches.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            Chưa có dữ liệu trận đấu.
          </div>
        )}
      </div>
    </div>
  );
}
