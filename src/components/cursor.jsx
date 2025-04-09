import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function Cursor() {

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothCursorX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const smoothCursorY = useSpring(cursorY, { damping: 20, stiffness: 300 });

  // Particle setup
  const numParticles = 10;
  const particleProps = useRef(
    Array.from({ length: numParticles }, () => ({
      x: useMotionValue(0),
      y: useMotionValue(0),
      scale: useMotionValue(1),
      opacity: useMotionValue(0.3),
    }))
  );

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY]);


  useEffect(() => {
    const animateParticles = () => {
      const time = Date.now() * 0.001; 
      const breathCycle = 10; 
      const minRadius = 20; 
      const radiusRange = 60;
      const rotationSpeed = 0.05; 


      const phase = (Math.sin((time % breathCycle) / breathCycle * Math.PI * 2) + 1) / 2;

      particleProps.current.forEach((props, i) => {
        const radius = minRadius + phase * radiusRange; 
        const angle = (i / numParticles) * Math.PI * 2 + time * rotationSpeed; 
        props.x.set(Math.cos(angle) * radius);
        props.y.set(Math.sin(angle) * radius);
        props.scale.set(1); 
        props.opacity.set(0.3); 
      });

      requestAnimationFrame(animateParticles);
    };
    animateParticles();
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: smoothCursorX,
        top: smoothCursorY,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
      }}
    >
     
      {particleProps.current.map((props, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent-300/50"
          style={{
            x: props.x,
            y: props.y,
            scale: props.scale,
            opacity: props.opacity,
            width: 5,
            height: 5,
          }}
        />
      ))}


      <motion.div
        className="absolute rounded-full w-16 h-16 bg-accent-200/50"
        style={{
          left: 0,
          top: 0,
          filter: 'blur(10px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 4,4,1, 1], 
        }}
        transition={{
          duration: 10, 
          repeat: Infinity,
          ease: 'easeInOut', 
        }}
      />

  
      <motion.div
        className="absolute rounded-full w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600"
        style={{
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 4,4,1, 1], 
        }}
        transition={{
          duration: 10, 
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}

export default Cursor;