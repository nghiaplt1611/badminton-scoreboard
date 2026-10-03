import { calculateMatchWinner } from '../utils/helpers';
import { differenceInMinutes, parse, isValid } from 'date-fns';

export default function Matches({ matches, players, onUpdateMatch }) {
  
  const getPlayerNames = (playerIds) => {
    if (!playerIds || !Array.isArray(playerIds)) return 'Chưa xếp';
    return playerIds
      .map(id => players.find(p => p.id === id)?.name || 'Unknown')
      .join(' & ');
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
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Danh sách các trận đấu</h2>
          <p className="text-sm text-slate-500 mt-1">Cập nhật kết quả trực tiếp. Chạm 21 điểm sẽ tự động phân định thắng thua.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Trận / Vòng</th>
                <th className="px-6 py-4 font-semibold w-1/4">Đội A</th>
                <th className="px-6 py-4 font-semibold text-center w-1/6">Tỉ số</th>
                <th className="px-6 py-4 font-semibold w-1/4 text-right">Đội B</th>
                <th className="px-6 py-4 font-semibold text-center">Thời gian</th>
                <th className="px-6 py-4 font-semibold text-center">Kết quả</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {matches.map((match) => (
                <tr key={match.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-slate-800">Trận {match.match_id}</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Vòng {match.round_number}</div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-700 bg-blue-50/50 px-3 py-2 rounded-lg border border-blue-100/50 inline-block">
                      {getPlayerNames(match.team_a_players)}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <input 
                        type="number"
                        min="0"
                        className="w-14 text-center font-bold text-lg rounded-md border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-1.5"
                        value={match.score_a ?? ''}
                        onChange={(e) => handleScoreChange(match.id, 'score_a', e.target.value, match)}
                      />
                      <span className="text-slate-400 font-bold">-</span>
                      <input 
                        type="number"
                        min="0"
                        className="w-14 text-center font-bold text-lg rounded-md border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-1.5"
                        value={match.score_b ?? ''}
                        onChange={(e) => handleScoreChange(match.id, 'score_b', e.target.value, match)}
                      />
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <div className="font-medium text-slate-700 bg-rose-50/50 px-3 py-2 rounded-lg border border-rose-100/50 inline-block">
                      {getPlayerNames(match.team_b_players)}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-1">
                        <input 
                          type="time"
                          className="text-xs rounded border-slate-200 py-1 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          value={match.start_time || ''}
                          onChange={(e) => handleTimeChange(match.id, 'start_time', e.target.value, match)}
                        />
                        <span className="text-slate-400">-</span>
                        <input 
                          type="time"
                          className="text-xs rounded border-slate-200 py-1 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          value={match.end_time || ''}
                          onChange={(e) => handleTimeChange(match.id, 'end_time', e.target.value, match)}
                        />
                      </div>
                      {match.duration_minutes != null && (
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {match.duration_minutes} phút
                        </span>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    {match.winner === 'A' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 shadow-sm">
                        Đội A Thắng
                      </span>
                    )}
                    {match.winner === 'B' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800 border border-rose-200 shadow-sm">
                        Đội B Thắng
                      </span>
                    )}
                    {!match.winner && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        Chưa xong
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {matches.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    Chưa có dữ liệu trận đấu. Vui lòng thêm dữ liệu vào Firestore.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
