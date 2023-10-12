/**
 * Common util functions and variables for game
 */



export const PLAYER_X = "X";
export const PLAYER_O = "O";

export const GAME_STATUS = {
  WIN: "You win!",
  LOSE: "You lost",
  DRAW: "It's a draw!",
}

/**
 * Checks if the game is won by a player given a board state
 *
 * @param tiles 1D array representation of the tiles in the game board
 * @param currentPlayer player that made the previous move
 * @returns boolean true if currentPlayer is the winner, false otherwise
 */
export function winCheck(tiles, currentPlayer) {
  let roundWon = false;

  // row check
  for (let i = 0; i < 3; i++) {
    if (
      tiles[i * 3] === currentPlayer &&
      tiles[i * 3 + 1] === currentPlayer &&
      tiles[i * 3 + 2] === currentPlayer
    ) {
      roundWon = true;
    }
  }

  // col check
  for (let i = 0; i < 3; i++) {
    if (
      tiles[i] === currentPlayer &&
      tiles[i + 3] === currentPlayer &&
      tiles[i + 6] === currentPlayer
    ) {
      roundWon = true;
    }
  }

  // diag check
  if (
    tiles[0] === currentPlayer &&
    tiles[4] === currentPlayer &&
    tiles[8] === currentPlayer
  ) {
    roundWon = true;
  }

  if (
    tiles[2] === currentPlayer &&
    tiles[4] === currentPlayer &&
    tiles[6] === currentPlayer
  ) {
    roundWon = true;
  }

  return roundWon;
}

/**
 * Checks if the game is drawn. The game is drawn if there are no winners and there are no more moves left
 *
 * @param tiles 1D representation of the tiles in the game board
 * @returns boolean true if the game is drawn, false otherwise
 */
export function drawCheck(tiles) {
  return !tiles.includes("");
}

/**
 * Return the next player that should make the move
 * @param player player that currently made the move
 * @return The next player that should make the move
 */
export function switchPlayer(player) {
  const nextPlayer = player === PLAYER_O ? PLAYER_X : PLAYER_O;
  return nextPlayer;
}
