
import { useState } from "react";
import Board from "./Board";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Game = () => {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });
  
  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const isDraw = !winner && current.every(square => square !== null);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Game ended in a draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i: number) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const currentCopy = [...historyCopy[historyCopy.length - 1]];
    
    // If there's already a winner or the square is filled, return early
    if (calculateWinner(currentCopy) || currentCopy[i]) {
      return;
    }
    
    currentCopy[i] = xIsNext ? "X" : "O";
    
    setHistory([...historyCopy, currentCopy]);
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);

    // Check for winner after move
    const newWinner = calculateWinner(currentCopy);
    if (newWinner) {
      const updatedScores = { ...scores };
      updatedScores[newWinner as keyof typeof scores] += 1;
      setScores(updatedScores);
      toast(`${newWinner} wins the game!`);
    } else if (currentCopy.every(square => square !== null)) {
      // It's a draw
      const updatedScores = { ...scores };
      updatedScores.ties += 1;
      setScores(updatedScores);
      toast("Game ended in a draw!");
    }
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, ties: 0 });
    resetGame();
    toast("Scores have been reset!");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold">Tic Tac Toe</h1>
      
      <div className="flex flex-col-reverse md:flex-row gap-8 items-center md:items-start">
        <div className="flex flex-col items-center gap-4">
          <Board squares={current} onClick={handleClick} />
          
          <div className="text-xl font-medium mt-4 animate-fade-in">
            {status}
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={resetGame}
              variant="outline"
            >
              New Game
            </Button>
            
            <Button 
              onClick={resetScores}
              variant="outline"
              className="text-destructive hover:text-destructive-foreground"
            >
              Reset Scores
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg min-w-[200px]">
          <h2 className="text-xl font-bold mb-4 text-center">Score Board</h2>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-game-x font-bold">Player X:</span>
              <span className="text-lg font-bold">{scores.X}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-game-o font-bold">Player O:</span>
              <span className="text-lg font-bold">{scores.O}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Ties:</span>
              <span className="text-lg font-bold">{scores.ties}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine the winner
const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  return null;
};

export default Game;
