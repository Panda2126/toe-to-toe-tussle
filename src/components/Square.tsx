
import { cn } from "@/lib/utils";

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square = ({ value, onClick }: SquareProps) => {
  const isX = value === "X";
  const isO = value === "O";
  
  return (
    <button
      className={cn(
        "w-full aspect-square bg-white border-2 border-game-border text-4xl md:text-6xl font-bold flex items-center justify-center",
        isX && "text-game-x hover:bg-blue-50",
        isO && "text-game-o hover:bg-orange-50",
        !value && "hover:bg-gray-50"
      )}
      onClick={onClick}
    >
      {value && (
        <span className={cn(
          "animate-pop-in",
          isX ? "text-game-x" : "text-game-o"
        )}>
          {value}
        </span>
      )}
    </button>
  );
};

export default Square;
