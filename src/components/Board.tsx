
import Square from "./Square";

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
}

const Board = ({ squares, onClick }: BoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-[350px] aspect-square">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onClick(i)}
        />
      ))}
    </div>
  );
};

export default Board;
