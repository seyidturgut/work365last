import { motion, useMotionValue, useTransform } from "framer-motion";

// Path definitions from your SVG
const PATH_GREEN_ACCENT = "M333.04,198.82v33.27c-.5-.13-1.16.76-1.06,1.36.45,2.59-.76,4.71-1.08,7.09-.27,1.96-.76,3.53-1.3,5.36-.47,1.59-.68,3.1-1.34,4.69-.54,1.31-.57,2.73-1.29,4.1-.17.31-1.86,5.09-2.72,6.91l-1.27,2.72-1.03,2.35c-2.32,5.31-5.58,10-8.67,14.94l-1.15,1.83c-3.5,5.59-12.76,15.37-17.9,20-5.15,4.66-10.4,8.72-16.31,12.34-6.09,3.73-12.08,7.04-18.79,9.56-2.56.96-5.3,2.2-7.77,2.9l-4.7,1.32c-4.36,1.23-7.31,1.89-11.77,2.58-4.05.63-7.84,1.62-12.09,1.03-.93-.13-1.87.25-2.36,1.09l-10.22.03c-.49-.94-1.38-1.18-2.36-1.09-7.11.65-12.37-1.28-18.34-2.29l-3.66-.62c.12.02-7.81-2.45-8.44-2.66l-3.95-1.35c-1.09-.37-2.24-.88-3.31-1.35l-3.01-1.33c-3.52-1.55-10.87-5.26-13.89-7.28l-7.63-5.11c-3.01-2.02-5.75-4.33-8.49-6.8-12.05-10.83-24-25.8-30.1-40.67l-1.36-3.31c-1.2-2.93-3.29-8.24-4.05-11.17l-1.3-5.07-1.36-5.63-1.48-8.46c-.44-2.49-.25-10.96-.86-13.34-.15-.58.28-1.9,1.08-1.9l54.16-.02c.9,0,1.43.79,1.35,1.58-.18,1.96.13,3.75.22,5.66.07,1.57.52,2.8.79,4.33l.81,4.55,1.34,4.33,1.45,3.91,1.24,2.76c3.18,7.07,11.28,18.03,17.79,22.18,1.55.99,2.73,2.42,4.36,3.27,2.56,1.34,4.81,3.06,7.48,4.17,1.95.81,4.7,2.02,6.61,2.61l4.33,1.34c2.19.68,4.41.67,6.63,1.46,1.69.6,3.78-.15,5.57.18,2.27.42,4.4.41,6.67,0,1.79-.33,3.85.41,5.58-.17,2.31-.78,4.6-.78,6.86-1.51l4.1-1.31c8.02-2.57,15.9-7.49,22.32-13.24,7.19-6.45,12.34-14.79,15.96-23.68.74-1.82,1.03-3.41,1.56-5.16.5-1.63,1.14-2.8,1.08-4.64-.06-2,1.13-3.98,1.15-6.01l.12-12.33c-1.31-2.58-.94-5.53-1.69-8.15l-1.4-4.92c-.31-1.1-2.12-5.55-2.75-6.85l-1.32-2.7c-.76-1.55-4.68-7.74-5.72-8.93l-2.63-3.01c-2.4-2.75-5.85-6.44-8.93-8.42-1.74-1.12-3.24-2.62-5.12-3.5-1.35-.63-2.44-1.58-3.76-2.23l-2.65-1.31-3.52-1.47-3.97-1.4c-1.41-.5-2.94-.95-4.4-1.21l-8.25-1.48c-2.69-.48-6.88.99-6.88-2.07v-52.49c0-2.84,4.32-1.95,6.24-1.71,2.08.27,4.23-.2,6.31.12l10.1,1.56,6.06,1.31,4.98,1.35c1.31.36,2.7.84,4.02,1.29l4,1.34c1.09.36,2.21.87,3.31,1.31l3.56,1.41c.95.38,1.96.97,2.85,1.43l2.66,1.37,2.84,1.41c2.43,1.2,4.68,2.64,7.03,4,1.24.72,2.17,1.88,3.53,2.46s2.25,1.72,3.44,2.51c6.41,4.29,13.18,11.05,18.48,16.74,4.54,4.88,10.95,13.77,14.11,19.57,1.19,2.18,2.51,4.16,3.58,6.45.55,1.18,1.01,2.25,1.57,3.45l1.26,2.68c.59,1.26,1.01,2.62,1.46,3.85l1.33,3.66c1.25,3.44,3.38,10.46,3.88,13.89.36,2.47,1.53,4.72,1.1,7.38-.09.55.72,1.12,1.08,1.03Z";
const PATH_MAIN_BODY = "M215.16,0c-.38.6.56,1.08.56,1.77v53.41c0,1.45-1.46,1.85-2.52,1.77-2.23-.17-4.2.21-6.35.24l-6.7.11c-3.23.05-6.32,1.29-9.65,1.3-1.77,0-3.39.77-5.08,1.18-1.02.25-2.15-.11-3.1.23-2.02.73-3.87,1.22-6.01,1.36-.92.06-1.83,1.18-2.81,1.08-1.72-.17-2.95.86-4.45,1.17s-2.49.71-3.85,1.18l-4.17,1.45-3.67,1.39c-11.79,4.47-22.63,10.43-33.01,17.67-16.37,11.41-31.51,26.91-42.18,43.72-1.66,2.61-3.34,4.96-4.79,7.7l-1.61,3.03c-.94,1.78-1.88,3.43-2.78,5.23l-1.21,2.45-1.46,3.17-1.11,2.58-1.62,4.03c-.9,2.24-1.99,5.41-2.67,6.99-.6,1.39-.76,2.78-1.25,4.12-.59,1.61-.98,3.02-1.34,4.68s-1.34,2.9-1.22,4.74c.08,1.21-1.27,2.53-1.09,3.76.31,2.17-.96,3.82-1.18,5.77-.39,3.35-.53,6.56-1.52,9.88.07-.24-.33,8.99-.42,10.01-.16,1.91-.49,3.97-.28,5.98.08.79-.18,2.87-1.37,2.87l-53.76.05c-.5,0-.91-.33-1.13-.45-.58-.33-.34-13.3-.08-15.34.12-.92,1.07-1.61.94-2.81-.45-4.17.37-8.24,1.16-12.29.31-1.58-.2-3.12.43-4.64.72-1.77,1.01-3.71,1.03-5.62.01-1.61.94-3.04,1.05-4.51.15-2.07.88-3.75,1.3-5.69s.8-3.49,1.32-5.37l1.29-4.71,1.38-4.25c.48-1.49.75-2.86,1.37-4.34,1.13-2.7,1.61-4.7,2.77-7.55.5-1.22.98-2.3,1.46-3.54l1.11-2.88,1.49-3.52,1.39-2.9c.42-.88.86-1.59,1.24-2.45l1.43-3.22,1.39-2.57c.46-.86.77-1.64,1.22-2.48l1.62-3.02,3.06-5.37c.76-1.33,1.56-2.6,2.43-3.92l7.49-11.4,4.71-6.3,4.63-5.75c1.7-2.11,5.91-7.13,7.7-8.91l13.49-13.41c6.01-5.98,12.61-10.9,19.44-15.87l4.21-3.06,3.48-2.3c6.24-4.14,14.9-9.1,21.61-12.55l2.42-1.25c1.18-.61,2.37-.88,3.55-1.48,3.33-1.71,5.58-2.55,8.98-3.98l3.27-1.37,3.6-1.34c1.37-.51,2.6-.94,3.96-1.42l4.19-1.47c.74-.26,13.19-3.9,13.42-3.95l3.9-.76c1.81-.35,3.55-.63,5.25-1.16,2.52-.78,5.03-.88,7.52-1.46,2.91-.68,5.59-.87,8.5-1.24,5.27-.67,10.31-1.56,15.71-1.04.81.08,1.71-.46,1.65-1.15h10.32Z";

export default function HeroLogoAnimation({ textIndex = 0 }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Intense 3D tilt for a highly interactive "floating crystal" feel
    const rotateX = useTransform(y, [-500, 500], [25, -25]);
    const rotateY = useTransform(x, [-500, 500], [-25, 25]);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        // Snap back to center smoothly with spring physics handled by framer-motion inherently if we don't force it, but setting to 0 works well.
        x.set(0);
        y.set(0);
    }

    // 0: "hızlıca kur" -> Blueprint drawing
    // 1: "kaliteli yönet" -> Solid Navy
    // 2: "geliştir, destek al" -> Pulsing green highlight
    // 3: "BÜYÜT" -> Huge scale, glowing solid Green

    const containerVariants = {
        state0: { scale: 0.9, y: [0, -15, 0], filter: "drop-shadow(0px 10px 20px rgba(148, 163, 184, 0.2))" },
        state1: { scale: 1.0, y: [0, -20, 0], filter: "drop-shadow(0px 20px 30px rgba(42, 52, 65, 0.3))" },
        state2: { scale: 1.05, y: [0, -25, 0], filter: "drop-shadow(0px 30px 40px rgba(121, 155, 56, 0.4))" },
        state3: { scale: 1.25, y: [0, -10, 0], filter: "drop-shadow(0px 40px 60px rgba(121, 155, 56, 0.6))" },
    };

    const navyPathVariants = {
        state0: { pathLength: 0.4, fill: "transparent", stroke: "rgba(148, 163, 184, 0.6)", strokeWidth: 1 }, // slate-400
        state1: { pathLength: 1, fill: "rgba(42, 52, 65, 1)", stroke: "rgba(42, 52, 65, 1)", strokeWidth: 2 },     // Navy
        state2: { pathLength: 1, fill: "rgba(42, 52, 65, 0.9)", stroke: "rgba(121, 155, 56, 0.5)", strokeWidth: 3 }, // Navy + Green edge
        state3: { pathLength: 1, fill: "rgba(121, 155, 56, 1)", stroke: "transparent", strokeWidth: 0 },         // Solid Green
    };

    const greenPathVariants = {
        state0: { pathLength: 0.2, fill: "transparent", stroke: "rgba(148, 163, 184, 0.3)", strokeWidth: 1 },
        state1: { pathLength: 0.8, fill: "transparent", stroke: "rgba(121, 155, 56, 0.6)", strokeWidth: 2 },
        state2: { pathLength: 1, fill: "rgba(121, 155, 56, 0.8)", stroke: "rgba(121, 155, 56, 1)", strokeWidth: 3 },
        state3: { pathLength: 1, fill: "rgba(121, 155, 56, 1)", stroke: "transparent", strokeWidth: 0 },
    };

    const glowVariants = {
        state0: { opacity: 0.05, scale: 0.6, backgroundColor: "#94A3B8" }, // slate-400
        state1: { opacity: 0.15, scale: 1.0, backgroundColor: "#2A3441" }, // navy
        state2: { opacity: 0.4, scale: 1.3, backgroundColor: "#799B38" },  // green
        state3: { opacity: 0.7, scale: 1.8, backgroundColor: "#799B38" },  // massive green
    };

    return (
        <div
            className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center perspective-[1000px] pointer-events-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Dynamic Ambient Glow */}
            <motion.div
                variants={glowVariants}
                initial="state0"
                animate={`state${textIndex}`}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute w-[60%] h-[60%] blur-[80px] rounded-full mix-blend-multiply"
                style={{ translateZ: -100 }}
            />

            {/* 3D Floating Logo Container */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                variants={containerVariants}
                initial="state0"
                animate={`state${textIndex}`}
                transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    filter: { duration: 0.6 }
                }}
                className="relative w-4/5 h-4/5 flex items-center justify-center cursor-pointer"
            >
                <svg
                    viewBox="0 0 333.04 334.3"
                    className="w-full h-full overflow-visible"
                >
                    {/* Main Body Path (Navy Structure -> Green) */}
                    <motion.path
                        d={PATH_MAIN_BODY}
                        variants={navyPathVariants}
                        initial="state0"
                        animate={`state${textIndex}`}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        style={{ translateZ: 30 }}
                    />

                    {/* Green Accent Shell */}
                    <motion.path
                        d={PATH_GREEN_ACCENT}
                        variants={greenPathVariants}
                        initial="state0"
                        animate={`state${textIndex}`}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        style={{ translateZ: 80 }}
                    />
                </svg>

                {/* Abstract Floating Orbits (Very subtle 3D rings that only appear on later states) */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-green-500/20"
                    animate={{
                        opacity: textIndex >= 2 ? 1 : 0,
                        rotateZ: 360,
                        scale: textIndex === 3 ? 1.4 : 1.1
                    }}
                    transition={{ rotateZ: { duration: 20, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.5 }, scale: { duration: 0.5 } }}
                    style={{ translateZ: 0 }}
                />
                <motion.div
                    className="absolute inset-[-10%] rounded-full border border-navy-500/10"
                    animate={{
                        opacity: textIndex >= 1 ? 1 : 0,
                        rotateZ: -360,
                        scale: textIndex === 3 ? 1.6 : 1.2
                    }}
                    transition={{ rotateZ: { duration: 25, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.5 }, scale: { duration: 0.5 } }}
                    style={{ translateZ: -50 }}
                />

            </motion.div>
        </div>
    );
}
