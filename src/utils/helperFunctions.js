const calculatePoints = (matches, playerId) => {
  let points = 0;

  matches.forEach(match => {
    if (
      match.player1 &&
      match.player2 &&
      (match.player1.id === playerId || match.player2.id === playerId)
    ) {
      const playerScore =
        match.player1.id === playerId
          ? match.player1.score
          : match.player2.score;
      const opponentScore =
        match.player1.id === playerId
          ? match.player2.score
          : match.player1.score;

      if (playerScore > opponentScore) {
        points += 3; // Win
      } else if (playerScore === opponentScore) {
        points += 1; // Draw
      }
      // No points for loss
    }
  });

  return points;
};

const updatePlayerPoints = (players, matches) => {
  return players.map(player => ({
    ...player,
    points: calculatePoints(matches, player?.id),
  }));
};

export {calculatePoints, updatePlayerPoints};
