import { useSpring, animated } from '@react-spring/web';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

function Fluid() {
  const [fastSpring, setFastSpring] = useSpring(() => ({
    xy: [50, 50],
    config: { mass: 1, tension: 200, friction: 20 },
  }));
  const [slowSpring, setSlowSpring] = useSpring(() => ({
    xy: [50, 50],
    config: { mass: 5, tension: 100, friction: 50 },
  }));
  const [springProps, setSpringProps] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
  const trans = (x, y) => `translate3d(${x / 50}px, ${y / 50}px, 0)`;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const percentX = (e.clientX / window.innerWidth) * 100;
      const percentY = (e.clientY / window.innerHeight) * 100;
      setFastSpring({ xy: [percentX, percentY] });
      setSlowSpring({ xy: [percentX, percentY] });
      setSpringProps({ xy: calc(e.clientX, e.clientY) });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setFastSpring, setSlowSpring, setSpringProps]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <animated.div
        style={{
          transform: springProps.xy.to(trans),
          background: 'linear-gradient(135deg, #E0F2FE, #BAE6FD, #7DD3FC)',
          opacity: 0.3,
        }}
        className="absolute inset-0"
      />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        style={{ background: 'conic-gradient(from 0deg, #E0F2FE, #BAE6FD, #7DD3FC, #D1FAE5, #A7F3D0, #6EE7B7, #E0F2FE)' }}
      />
      <animated.div
        className="absolute inset-0"
        style={{
          background: slowSpring.xy.to(
            (x, y) => `
              radial-gradient(circle at ${x}% ${y}%, #D1FAE5, transparent 50%),
              radial-gradient(circle at ${100 - x}% ${100 - y}%, #A7F3D0, transparent 50%)
            `
          ),
          opacity: 0.6,
        }}
      />
      <animated.div
        className="absolute inset-0"
        style={{
          background: fastSpring.xy.to(
            (x, y) => `
              radial-gradient(circle at ${x}% ${y}%, #6EE7B7, transparent 50%),
              radial-gradient(circle at ${100 - x}% ${100 - y}%, #34D399, transparent 50%)
            `
          ),
          opacity: 0.4,
        }}
      />
    </div>
  );
}

export default Fluid;