"use client";

import Image from "next/image";
import ProfilePortrait from "@/public/images/profile-portrait.png";
import { CHAR_SIZE } from "@/constants/game";

interface HopCharacterProps {
  x: number;
  y: number;
  cameraY: number;
  isGrounded: boolean;
  facingRight: boolean;
  vy: number;
}

export default function HopCharacter({
  x,
  y,
  cameraY,
  isGrounded,
  facingRight,
  vy,
}: HopCharacterProps) {
  const screenY = y - cameraY;

  // Squash/stretch based on state
  let scaleX = 1;
  let scaleY = 1;
  if (!isGrounded && vy < -2) {
    // Jumping up — stretch vertically
    scaleX = 0.9;
    scaleY = 1.15;
  } else if (!isGrounded && vy > 2) {
    // Falling — squash horizontally
    scaleX = 1.1;
    scaleY = 0.9;
  } else if (isGrounded) {
    scaleX = 1.05;
    scaleY = 0.95;
  }

  // Flip based on facing direction
  if (!facingRight) scaleX *= -1;

  return (
    <div
      className="absolute pointer-events-none z-30"
      style={{
        left: x,
        top: screenY,
        width: CHAR_SIZE,
        height: CHAR_SIZE,
        transform: `scaleX(${scaleX}) scaleY(${scaleY})`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Character sprite */}
      <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-primary/60 shadow-lg shadow-primary/20">
        <Image
          src={ProfilePortrait}
          alt="Character"
          width={CHAR_SIZE}
          height={CHAR_SIZE}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Shadow beneath character */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black/20 dark:bg-black/40 blur-sm"
        style={{
          bottom: -6,
          width: CHAR_SIZE * 0.6,
          height: 6,
          opacity: isGrounded ? 0.6 : 0.2,
        }}
      />
    </div>
  );
}
