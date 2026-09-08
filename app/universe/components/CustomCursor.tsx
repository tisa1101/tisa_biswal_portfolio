"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);

  const springX = useSpring(cursorX, { stiffness: 800, damping: 50 });
  const springY = useSpring(cursorY, { stiffness: 800, damping: 50 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    window.addEventListener("mousemove", move);

    // Attach hover detection to interactive elements
    const update = () => {
      document.querySelectorAll(
        "button, a, [data-hoverable], .planet-orb"
      ).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    update();
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className={`universe-cursor ${hovering ? "hovering" : ""}`}
    >
      <div className="universe-cursor-dot" />
      {/* Star sparkles */}
      {hovering && (
        <>
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.div
              key={deg}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              transition={{ delay: i * 0.03 }}
              style={{
                position: "absolute",
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "#ffffff",
                top: "50%",
                left: "50%",
                transform: `rotate(${deg}deg) translateX(14px) translate(-50%, -50%)`,
                boxShadow: "0 0 4px #4488ff",
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
