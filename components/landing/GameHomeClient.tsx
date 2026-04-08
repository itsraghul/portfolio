"use client";

import { AnimatePresence } from "framer-motion";
import { useGameState } from "@/hooks/use-game-state";
import { useEasterEggs } from "@/hooks/use-easter-eggs";
import { BENTO_BLOCKS } from "@/constants/game";
import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import FeaturedWork from "@/components/landing/FeaturedWork";
import QuickLinks from "@/components/landing/QuickLinks";
import BentoGrid from "@/components/landing/game/BentoGrid";
import GameModeBar from "@/components/landing/game/GameModeBar";
import ScoreDisplay from "@/components/landing/game/ScoreDisplay";
import PuzzleComplete from "@/components/landing/game/PuzzleComplete";
import HopGame from "@/components/landing/game/HopGame";

export default function GameHomeClient() {
  const { state, dispatch, isGameActive, correctCount, setMode } = useGameState();

  const { handleBlockClick, handleBlockHoverStart, handleBlockHoverEnd } = useEasterEggs({
    dispatch,
    revealedEggs: state.revealedEggs,
    isGameActive,
  });

  const isHopMode = state.mode === "hop";

  return (
    <>
      {/* Normal mode: original layout */}
      {!isGameActive && (
        <div className="w-full">
          <HeroSection />
          <StatsBar />
          <FeaturedWork />
          <QuickLinks />
        </div>
      )}

      {/* Hop mode: platformer game */}
      {isHopMode && (
        <HopGame
          dispatch={dispatch}
          startTime={state.startTime}
          onModeChange={setMode}
        />
      )}

      {/* Other game modes: bento grid */}
      {isGameActive && !isHopMode && (
        <>
          <BentoGrid
            state={state}
            dispatch={dispatch}
            onBlockClick={handleBlockClick}
            onBlockHoverStart={handleBlockHoverStart}
            onBlockHoverEnd={handleBlockHoverEnd}
          />

          <AnimatePresence>
            <ScoreDisplay
              score={state.score}
              moveCount={state.moveCount}
              startTime={state.startTime}
              correctCount={correctCount}
              totalBlocks={BENTO_BLOCKS.length}
              isPuzzleMode={state.mode === "puzzle"}
            />
          </AnimatePresence>

          <PuzzleComplete
            isVisible={state.puzzleSolved}
            score={state.score}
            moveCount={state.moveCount}
            startTime={state.startTime}
            onModeChange={setMode}
          />
        </>
      )}

      {/* Score display for hop mode */}
      {isHopMode && (
        <AnimatePresence>
          <ScoreDisplay
            score={state.score}
            moveCount={state.moveCount}
            startTime={state.startTime}
            correctCount={0}
            totalBlocks={BENTO_BLOCKS.length}
            isPuzzleMode={false}
          />
        </AnimatePresence>
      )}

      {/* Always show the game mode bar */}
      <GameModeBar currentMode={state.mode} onModeChange={setMode} />
    </>
  );
}
