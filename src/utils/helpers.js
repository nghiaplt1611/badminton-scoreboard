export const calculateMatchWinner = (scoreA, scoreB) => {
  if (scoreA >= 21) return 'A';
  if (scoreB >= 21) return 'B';
  return null;
};

export const computeStats = (players, matches) => {
  let totalScoreA = 0;
  let totalScoreB = 0;

  matches.forEach(match => {
    totalScoreA += match.score_a || 0;
    totalScoreB += match.score_b || 0;
  });

  const stats = players.map(p => {
    let played = 0;
    let won = 0;
    let totalWonPoints = 0;

    matches.forEach(match => {
      // Chỉ tính các trận đã kết thúc
      if (!match.winner) return;

      const isTeamA = match.team_a_players?.includes(p.id);
      const isTeamB = match.team_b_players?.includes(p.id);

      if (isTeamA || isTeamB) {
        played++;
        if ((isTeamA && match.winner === 'A') || (isTeamB && match.winner === 'B')) {
          won++;
          totalWonPoints += isTeamA ? (match.score_a || 0) : (match.score_b || 0);
        }
      }
    });

    return {
      ...p,
      played,
      won,
      totalWonPoints,
      winRate: played > 0 ? (won / played) * 100 : 0
    };
  });

  return { stats, totalScoreA, totalScoreB };
};

export const getMVPs = (stats) => {
  const males = stats.filter(p => p.gender === 'Nam');
  const females = stats.filter(p => p.gender === 'Nữ');

  const getTopPlayers = (group) => {
    if (group.length === 0) return [];
    
    const sorted = [...group].sort((a, b) => {
      if (b.won !== a.won) return b.won - a.won;
      return b.totalWonPoints - a.totalWonPoints;
    });

    if (sorted.length === 0 || sorted[0].won === 0) return [];
    
    const maxWon = sorted[0].won;
    const maxPoints = sorted[0].totalWonPoints;

    return sorted.filter(p => p.won === maxWon && p.totalWonPoints === maxPoints);
  };

  return {
    mvpMales: getTopPlayers(males),
    mvpFemales: getTopPlayers(females)
  };
};
