"use client";

import { AnimatePresence } from "framer-motion";
import { useGameState } from "@/hooks/use-game-state";
import { useEasterEggs } from "@/hooks/use-easter-eggs";
import { useGravityPhysics } from "@/hooks/use-gravity-physics";
import { BENTO_BLOCKS } from "@/constants/game";
import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import FeaturedWork from "@/components/landing/FeaturedWork";
import QuickLinks from "@/components/landing/QuickLinks";
import BentoGrid from "@/components/landing/game/BentoGrid";
import GameModeBar from "@/components/landing/game/GameModeBar";
import ScoreDisplay from "@/components/landing/game/ScoreDisplay";
import PuzzleComplete from "@/components/landing/game/PuzzleComplete";

export default function GameHomeClient() {
  const { state, dispatch, isGameActive, correctCount, setMode } = useGameState();

  const { handleBlockClick, handleBlockHoverStart, handleBlockHoverEnd } = useEasterEggs({
    dispatch,
    revealedEggs: state.revealedEggs,
    isGameActive,
  });

  const { positions: gravityPositions } = useGravityPhysics(
    state.blockOrder,
    state.mode === "gravity"
  );

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

      {/* Game mode: bento grid */}
      {isGameActive && (
        <>
          <BentoGrid
            state={state}
            dispatch={dispatch}
            onBlockClick={handleBlockClick}
            onBlockHoverStart={handleBlockHoverStart}
            onBlockHoverEnd={handleBlockHoverEnd}
            gravityPositions={state.mode === "gravity" ? gravityPositions : undefined}
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

      {/* Always show the game mode bar */}
      <GameModeBar currentMode={state.mode} onModeChange={setMode} />
    </>
  );
}
