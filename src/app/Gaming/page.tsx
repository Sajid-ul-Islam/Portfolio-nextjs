"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FaGamepad } from "react-icons/fa";
import { LuMonitor, LuTrophy } from "react-icons/lu";

import Badge from "../components/vscode/Badge";
import Panel from "../components/vscode/Panel";
import SectionHeader from "../components/vscode/SectionHeader";
import { favoriteGames, gamingPlatforms, gamingStats } from "../data/portfolio";
import { cn } from "../lib/cn";

type GameType = "none" | "snake" | "tictactoe";

type Coord = [number, number];

function TicTacToe() {
  const [board, setBoard] = useState<("" | "X" | "O")[]>(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = useMemo(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return "";
  }, [board]);

  const handleClick = (index: number) => {
    if (winner || board[index]) return;
    const next = [...board];
    next[index] = xIsNext ? "X" : "O";
    setBoard(next);
    setXIsNext(!xIsNext);
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setXIsNext(true);
  };

  return (
    <div className="space-y-3">
      <div className="text-[12px] text-[var(--vscode-text-secondary)]">
        {winner
          ? `Winner: ${winner}`
          : board.every(cell => cell !== "")
          ? "Draw"
          : `Next player: ${xIsNext ? "X" : "O"}`}
      </div>
      <div className="grid grid-cols-3 gap-1 w-[240px]">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="h-12 rounded border border-white/10 bg-[#111] text-white text-lg font-bold"
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        onClick={reset}
        className="px-3 py-1 rounded border border-white/20 text-[var(--vscode-text-primary)] bg-white/10 hover:bg-white/20"
      >
        Reset
      </button>
    </div>
  );
}

function SnakeGame() {
  const width = 15;
  const height = 15;
  const [snake, setSnake] = useState<Coord[]>([[7, 7]]);
  const [direction, setDirection] = useState<Coord>([1, 0]);
  const [food, setFood] = useState<Coord>([2, 2]);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const validFood = () => {
      let next: Coord;
      do {
        next = [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
      } while (snake.some(([x, y]) => x === next[0] && y === next[1]));
      return next;
    };
    const makeMove = () => {
      setSnake(prev => {
        const head = prev[prev.length - 1];
        const next: Coord = [(head[0] + direction[0] + width) % width, (head[1] + direction[1] + height) % height];
        const collision = prev.some(([x, y]) => x === next[0] && y === next[1]);
        if (collision) {
          setIsRunning(false);
          return prev;
        }
        const ate = next[0] === food[0] && next[1] === food[1];
        if (ate) {
          setFood(validFood());
          setScore(s => s + 1);
          return [...prev, next];
        }
        return [...prev.slice(1), next];
      });
    };

    if (!isRunning) return;
    const timer = window.setInterval(makeMove, 150);
    return () => window.clearInterval(timer);
  }, [direction, food, isRunning, snake]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") setDirection([0, -1]);
      if (event.key === "ArrowDown") setDirection([0, 1]);
      if (event.key === "ArrowLeft") setDirection([-1, 0]);
      if (event.key === "ArrowRight") setDirection([1, 0]);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const reset = () => {
    setSnake([[7, 7]]);
    setDirection([1, 0]);
    setFood([2, 2]);
    setScore(0);
    setIsRunning(true);
  };

  const grid = Array.from({ length: width * height }, (_, idx) => {
    const x = idx % width;
    const y = Math.floor(idx / width);
    const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);
    const isFood = food[0] === x && food[1] === y;
    return (
      <div
        key={`${x}-${y}`}
        className={cn(
          "h-4 w-4 border border-white/10",
          isSnake ? "bg-[#a3e635]" : isFood ? "bg-[#f97316]" : "bg-black"
        )}
      />
    );
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 text-[12px] text-[var(--vscode-text-secondary)]">
        <span>Score: {score}</span>
        <span>Status: {isRunning ? "Running" : "Game Over"}</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`, width: 240 }}>
        {grid}
      </div>
      <div className="flex gap-2">
        <button
          onClick={reset}
          className="px-3 py-1 rounded border border-white/20 text-[var(--vscode-text-primary)] bg-white/10 hover:bg-white/20"
        >
          Reset
        </button>
        <button
          onClick={() => setIsRunning(prev => !prev)}
          className="px-3 py-1 rounded border border-white/20 text-[var(--vscode-text-primary)] bg-white/10 hover:bg-white/20"
        >
          {isRunning ? "Pause" : "Resume"}
        </button>
      </div>
    </div>
  );
}

export default function GamingPage() {
  const [activeGame, setActiveGame] = useState<GameType>("none");

  return (
    <>
      <SectionHeader
        title="Gaming"
        description="When I'm not coding, I enjoy playing video games to unwind."
      />
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          className="px-3 py-1 rounded bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] hover:bg-[#a3e635]/20"
          onClick={() => setActiveGame("snake")}
        >
          Play Snake (Nokia)
        </button>
        <button
          className="px-3 py-1 rounded bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] hover:bg-[#a3e635]/20"
          onClick={() => setActiveGame("tictactoe")}
        >
          Play Tic Tac Toe
        </button>
        <button
          className="px-3 py-1 rounded bg-white/10 border border-white/20 text-[var(--vscode-text-primary)] hover:bg-white/20"
          onClick={() => setActiveGame("none")}
        >
          Close Game
        </button>
      </div>

      {activeGame !== "none" && (
        <Panel className="mb-6 p-6">
          <h3 className="font-bold text-[var(--vscode-text-primary)] mb-2">{activeGame === "snake" ? "Snake (Nokia)" : "Tic Tac Toe"}</h3>
          {activeGame === "snake" ? <SnakeGame /> : <TicTacToe />}
        </Panel>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4 flex items-center gap-2">
              <FaGamepad className="text-[var(--vscode-accent)]" />
              Favorite Games
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {favoriteGames.map((game) => (
                <Panel
                  key={game.name}
                  className="flex items-center justify-between p-4"
                  hover
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-1 bg-[#0b1118] border border-white/10 rounded">
                      <Image
                        src={game.image || "https://via.placeholder.com/80x60?text=Game"}
                        alt={`${game.name} image`}
                        width={80}
                        height={60}
                        className="h-14 w-20 object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3 className="text-vscode-sm font-medium text-[var(--vscode-text-primary)]">
                        {game.name}
                      </h3>
                      <p className="text-vscode-xs text-[var(--vscode-text-secondary)]">
                        {game.category}
                      </p>
                      {game.poster && (
                        <Image
                          src={game.poster}
                          alt={`${game.name} official poster`}
                          width={250}
                          height={150}
                          className="mt-2 h-20 w-full rounded border border-white/10 object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <Badge>{game.platform}</Badge>
                </Panel>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4 flex items-center gap-2">
              <LuMonitor size={20} className="text-[var(--vscode-accent)]" />
              Platforms
            </h2>
            <div className="flex flex-wrap gap-3">
              {gamingPlatforms.map((platform) => (
                <Panel
                  key={platform.name}
                  className={cn("flex items-center gap-3 px-6 py-4")}
                  hover
                >
                  <LuMonitor size={24} className="text-[var(--vscode-accent)]" />
                  <span className="text-vscode-sm text-[var(--vscode-text-primary)]">
                    {platform.name}
                  </span>
                </Panel>
              ))}
            </div>
          </section>
        </div>
        <aside>
          <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4 flex items-center gap-2">
            <LuTrophy size={20} className="text-[var(--vscode-accent)]" />
            Quick Stats
          </h2>
          <Panel className="p-4 space-y-4">
            {gamingStats.map((stat) => (
              <div key={stat.label} className="flex justify-between items-center">
                <span className="text-vscode-sm text-[var(--vscode-text-secondary)]">
                  {stat.label}
                </span>
                <span className="text-vscode-sm font-medium text-[var(--vscode-text-primary)]">
                  {stat.value}
                </span>
              </div>
            ))}
          </Panel>
        </aside>
      </div>
    </>
  );
}
