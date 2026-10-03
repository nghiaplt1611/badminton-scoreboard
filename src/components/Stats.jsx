import { useState } from 'react';
import { Trophy, Medal, Star, Edit2, X, Save } from 'lucide-react';

export default function Stats({ stats, totalScoreA, totalScoreB, mvpMales, mvpFemales, onUpdatePlayer }) {
  const [editingPlayer, setEditingPlayer] = useState(null);
  
  const getAvatarFallback = (name) => name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Team Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl shadow-lg p-6 text-white group">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
          <h3 className="text-teal-100 font-medium text-lg mb-1 relative z-10">Tổng điểm Đội A</h3>
          <div className="flex items-end gap-3 relative z-10">
            <span className="text-5xl font-extrabold tracking-tight">{totalScoreA}</span>
            <span className="text-teal-200 font-medium mb-1.5">điểm</span>
          </div>
          {totalScoreA > totalScoreB && (
            <div className="absolute bottom-6 right-6 z-10 animate-bounce">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Trophy className="w-4 h-4 text-yellow-300" />
              </span>
            </div>
          )}
        </div>
        
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-lg p-6 text-white group">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
          <h3 className="text-orange-100 font-medium text-lg mb-1 relative z-10">Tổng điểm Đội B</h3>
          <div className="flex items-end gap-3 relative z-10">
            <span className="text-5xl font-extrabold tracking-tight">{totalScoreB}</span>
            <span className="text-orange-200 font-medium mb-1.5">điểm</span>
          </div>
          {totalScoreB > totalScoreA && (
            <div className="absolute bottom-6 right-6 z-10 animate-bounce">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Trophy className="w-4 h-4 text-yellow-300" />
              </span>
            </div>
          )}
        </div>
      </div>

      {/* MVPs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* MVP Nam */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-start gap-5">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
            <Medal className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">MVP Nam</h3>
            {mvpMales.length > 0 ? (
              <div className="space-y-3">
                {mvpMales.map(m => (
                  <div key={m.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center border border-teal-200 shadow-sm">
                      {getAvatarFallback(m.name)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-lg flex items-center gap-1.5">
                        {m.name} 
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      </div>
                      <div className="text-sm text-slate-500 font-medium">{m.won} trận thắng / {m.totalWonPoints} điểm thắng / Đội {m.team}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic text-sm">Chưa đủ dữ liệu</p>
            )}
          </div>
        </div>

        {/* MVP Nữ */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-start gap-5">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
            <Medal className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">MVP Nữ</h3>
            {mvpFemales.length > 0 ? (
              <div className="space-y-3">
                {mvpFemales.map(f => (
                  <div key={f.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center border border-orange-200 shadow-sm">
                      {getAvatarFallback(f.name)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-lg flex items-center gap-1.5">
                        {f.name}
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      </div>
                      <div className="text-sm text-slate-500 font-medium">{f.won} trận thắng / {f.totalWonPoints} điểm thắng / Đội {f.team}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic text-sm">Chưa đủ dữ liệu</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-teal-50/50">
          <h2 className="text-lg font-bold text-slate-800">Thống kê chi tiết</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-teal-50/80 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Thành viên</th>
                <th className="px-6 py-4 font-semibold text-center">Đội</th>
                <th className="px-6 py-4 font-semibold text-center">Giới tính</th>
                <th className="px-6 py-4 font-semibold text-center">Đã đấu</th>
                <th className="px-6 py-4 font-semibold text-center">Trận thắng</th>
                <th className="px-6 py-4 font-semibold text-center">Điểm thắng</th>
                <th className="px-6 py-4 font-semibold text-right">Tỷ lệ thắng</th>
                <th className="px-4 py-4 font-semibold text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.sort((a, b) => {
                if (b.won !== a.won) return b.won - a.won;
                return b.totalWonPoints - a.totalWonPoints;
              }).map((player) => (
                <tr key={player.id} className="hover:bg-teal-50/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full font-bold flex items-center justify-center text-xs shadow-sm ${
                        player.team === 'A' ? 'bg-teal-100 text-teal-700 border border-teal-200' : 'bg-orange-100 text-orange-700 border border-orange-200'
                      }`}>
                        {getAvatarFallback(player.name)}
                      </div>
                      <span className="font-bold text-slate-800">{player.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold shadow-sm ${
                        player.team === 'A' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-orange-50 text-orange-700 border border-orange-200'
                    }`}>
                      Đội {player.team}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-600 font-medium">
                    {player.gender}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-700">
                    {player.played}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-emerald-600">
                    {player.won}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-teal-600">
                    {player.totalWonPoints}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-bold text-slate-800">{player.winRate.toFixed(1)}%</span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${player.winRate >= 50 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                          style={{ width: `${player.winRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button 
                      onClick={() => setEditingPlayer(player)}
                      className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                      title="Sửa thông tin"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {stats.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    Chưa có dữ liệu thành viên. Vui lòng thêm dữ liệu vào Firestore.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Chỉnh sửa Thành viên */}
      {editingPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in border border-slate-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800">Cập nhật thông tin</h3>
              <button onClick={() => setEditingPlayer(null)} className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200/50 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên thành viên</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  value={editingPlayer.name}
                  onChange={(e) => setEditingPlayer({...editingPlayer, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Đội</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    value={editingPlayer.team}
                    onChange={(e) => setEditingPlayer({...editingPlayer, team: e.target.value})}
                  >
                    <option value="A">Đội A</option>
                    <option value="B">Đội B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Giới tính</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    value={editingPlayer.gender}
                    onChange={(e) => setEditingPlayer({...editingPlayer, gender: e.target.value})}
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setEditingPlayer(null)}
                className="px-4 py-2 font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Hủy
              </button>
              <button 
                onClick={() => {
                  onUpdatePlayer(editingPlayer.id, {
                    name: editingPlayer.name,
                    team: editingPlayer.team,
                    gender: editingPlayer.gender
                  });
                  setEditingPlayer(null);
                }}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <Save className="w-4 h-4" /> Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
