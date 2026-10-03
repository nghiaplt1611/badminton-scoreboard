import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import Header from './components/Header';
import Matches from './components/Matches';
import Stats from './components/Stats';
import { computeStats, getMVPs } from './utils/helpers';
import { Trophy, CalendarDays, Download } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('matches');
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribePlayers = onSnapshot(collection(db, 'Players'), (snapshot) => {
      const playersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlayers(playersData);
    }, (error) => {
      console.error("Error fetching players: ", error);
    });

    const unsubscribeMatches = onSnapshot(collection(db, 'Matches'), (snapshot) => {
      const matchesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      matchesData.sort((a, b) => (a.match_id || 0) - (b.match_id || 0));
      setMatches(matchesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching matches: ", error);
      setLoading(false);
    });

    return () => {
      unsubscribePlayers();
      unsubscribeMatches();
    };
  }, []);

  const handleUpdateMatch = async (matchId, fieldOrData, value) => {
    try {
      const matchRef = doc(db, 'Matches', matchId);
      if (typeof fieldOrData === 'object' && fieldOrData !== null) {
        await updateDoc(matchRef, fieldOrData);
      } else {
        await updateDoc(matchRef, {
          [fieldOrData]: value
        });
      }
    } catch (error) {
      console.error("Error updating match:", error);
      alert("Lỗi khi cập nhật. Vui lòng kiểm tra quyền Firestore.");
    }
  };

  const handleUpdatePlayer = async (playerId, updatedData) => {
    try {
      const playerRef = doc(db, 'Players', playerId);
      await updateDoc(playerRef, updatedData);
    } catch (error) {
      console.error("Error updating player:", error);
      alert("Lỗi khi cập nhật thành viên.");
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-teal-50 text-teal-600 font-medium">Đang tải dữ liệu...</div>;
  }

  const { stats, totalScoreA, totalScoreB } = computeStats(players, matches);
  const { mvpMales, mvpFemales } = getMVPs(stats);

  const handleExport = async () => {
    try {
      const XLSX = await import('xlsx');
      
      const matchData = matches.map(m => {
        const teamA = m.team_a_players?.map(id => players.find(p => p.id === id)?.name).join(', ') || '';
        const teamB = m.team_b_players?.map(id => players.find(p => p.id === id)?.name).join(', ') || '';
        
        return {
          'Vòng': m.round_number,
          'Trận': m.match_id,
          'Đội A': teamA,
          'Đội B': teamB,
          'Điểm A': m.score_a || 0,
          'Điểm B': m.score_b || 0,
          'Đội Thắng': m.winner === 'A' ? 'Đội A' : (m.winner === 'B' ? 'Đội B' : ''),
          'Bắt đầu': m.start_time || '',
          'Kết thúc': m.end_time || '',
          'Thời lượng (phút)': m.duration_minutes || ''
        };
      });

      const statsData = stats.sort((a, b) => {
        if (b.won !== a.won) return b.won - a.won;
        return b.totalWonPoints - a.totalWonPoints;
      }).map(s => ({
        'Thành viên': s.name,
        'Đội': s.team,
        'Giới tính': s.gender,
        'Số trận đã đấu': s.played,
        'Số trận thắng': s.won,
        'Tổng điểm thắng': s.totalWonPoints,
        'Tỷ lệ thắng (%)': parseFloat(s.winRate.toFixed(2))
      }));

      const wb = XLSX.utils.book_new();
      
      const wsMatches = XLSX.utils.json_to_sheet(matchData);
      XLSX.utils.book_append_sheet(wb, wsMatches, 'Chi tiết trận đấu');
      
      const wsStats = XLSX.utils.json_to_sheet(statsData);
      XLSX.utils.book_append_sheet(wb, wsStats, 'Thống kê thành viên');

      XLSX.writeFile(wb, 'Badminton_Tournament_Report.xlsx');
    } catch (error) {
      console.error("Export error:", error);
      alert("Có lỗi xảy ra khi xuất file.");
    }
  };

  return (
    <div className="min-h-screen bg-teal-50/50 font-sans">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center mb-8 gap-4 w-full relative">
          <div className="hidden md:block flex-1"></div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 bg-slate-200/50 p-1 rounded-xl w-full md:w-[450px] flex-shrink-0 shadow-inner z-10">
            <button
              onClick={() => setActiveTab('matches')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'matches' 
                  ? 'bg-white text-teal-600 shadow-sm ring-1 ring-teal-900/5' 
                  : 'text-slate-600 hover:text-teal-700 hover:bg-white/50'
              }`}
            >
              <CalendarDays className="w-5 h-5" />
              <span>Lịch thi đấu</span>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'stats' 
                  ? 'bg-white text-teal-600 shadow-sm ring-1 ring-teal-900/5' 
                  : 'text-slate-600 hover:text-teal-700 hover:bg-white/50'
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span>Thống kê & MVP</span>
            </button>
          </div>
          
          <div className="flex-1 flex justify-center md:justify-end w-full">
            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 w-full md:w-auto"
            >
              <Download className="w-5 h-5" /> Xuất Báo Cáo
            </button>
          </div>
        </div>

        <div className="transition-opacity duration-300">
          {activeTab === 'matches' ? (
            <Matches 
              matches={matches} 
              players={players} 
              onUpdateMatch={handleUpdateMatch} 
            />
          ) : (
            <Stats 
              stats={stats} 
              totalScoreA={totalScoreA} 
              totalScoreB={totalScoreB} 
              mvpMales={mvpMales}
              mvpFemales={mvpFemales}
              onUpdatePlayer={handleUpdatePlayer}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
