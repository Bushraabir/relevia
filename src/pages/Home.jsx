import { Link } from 'react-router-dom'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { animated, useSpring } from '@react-spring/web'
import Cursor from '../components/cursor'
import Lottie from 'lottie-react'
import heartAnimation from '../assets/animation/heart.json'

const particleOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: { onHover: { enable: true, mode: 'attract' }, onClick: { enable: true, mode: 'push' } },
    modes: { attract: { distance: 200, duration: 0.6, factor: 2 }, push: { quantity: 4 } }
  },
  particles: {
    number: { value: 40, density: { enable: true, value_area: 1000 } },
    color: { value: ['#C4E1FF', '#D1FADF', '#D3D3FF'] },
    shape: { type: ['circle'] },
    opacity: { value: 0.2, random: true },
    size: { value: 2, random: { enable: true, minimumValue: 1 } },
    move: { enable: true, speed: 0.1, direction: 'none', random: true, straight: false, outModes: 'bounce' }
  },
  detectRetina: true
}

const particlesInit = async main => {
  await loadFull(main)
}

const FloatingOrbs = () => {
  const orbs = [
    { id: 1, x: '10%', y: '80%', size: 30, color: 'bg-primary-400', delay: 0 },
    { id: 2, x: '80%', y: '70%', size: 40, color: 'bg-secondary-400', delay: 0.5 },
    { id: 3, x: '50%', y: '90%', size: 25, color: 'bg-accent-400', delay: 1 }
  ]
  return (
    <>
      {orbs.map(orb => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full ${orb.color}`}
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
        />
      ))}
    </>
  )
}

function Home() {
  const { scrollY } = useScroll()
  const yOffset = useTransform(scrollY, [0, 600], [0, 100])
  const scaleHeader = useTransform(scrollY, [0, 600], [1, 0.9])
  const opacityHeader = useTransform(scrollY, [0, 600], [1, 0.7])
  const ref = useRef(null)
  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    hover: { y: -5, scale: 1.02, transition: { duration: 0.3 } }
  }
  const headerTextVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 1, ease: 'easeOut' } }
  }
  const gradientSpring = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 8000 },
    loop: { reverse: true }
  })
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Cursor />
      <motion.div style={{ y: yOffset, opacity: opacityHeader, scale: scaleHeader }} className="absolute inset-0 z-0">
        <Particles id="tsparticles" init={particlesInit} options={particleOptions} />
      </motion.div>
      <animated.div
        style={{ ...gradientSpring, background: 'linear-gradient(270deg, #f0f9ff, #e0f7fa, #f1f8e9)', backgroundSize: '200% 200%' }}
        className="absolute inset-0 z-0"
      />
      <FloatingOrbs />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Lottie animationData={heartAnimation} loop={true} speed={0.25} style={{ width: 400, height: 400 }} />

          </motion.div>
        </motion.div>
        <motion.h1 variants={headerTextVariants} initial="initial" animate="animate" className="text-5xl md:text-7xl font-heading font-bold text-neutral-900 text-center mb-12 tracking-tight">
          {["Embrace", "Your", "Serenity"].map((word, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.4, duration: 1 }} className="inline-block mr-2 md:mr-4">
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg md:text-xl font-body text-neutral-700 leading-relaxed">
            Allow the gentle rhythm of your breath and the calm flow of the universe to restore your inner peace.
          </p>
        </motion.div>
        <motion.div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-20">
          {[
            { to: '/about', title: 'Explore Awareness', desc: 'Deep dive into the roots of tranquility and mindfulness.' },
            { to: '/coping', title: 'Soothing Methods', desc: 'Discover gentle ways to ease anxiety and embrace calm.' },
            { to: '/medication', title: 'Healing Insights', desc: 'Clear and compassionate guidance on medication and wellness.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl p-8 cursor-pointer shadow-md"
            >
              <Link to={item.to}>
                <h2 className="text-2xl md:text-3xl font-heading text-primary-700 mb-3">{item.title}</h2>
                <p className="text-neutral-600 font-body">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-[70%] mx-auto my-20 relative overflow-hidden border border-gray-300
          before:content-[''] before:absolute before:top-0 before:left-16 before:bottom-0 before:w-0.5 before:bg-red-400 before:z-10
          after:content-[''] after:absolute after:top-16 after:left-0 after:right-0 after:h-0.5 after:bg-red-400 after:z-10 font-handwritten text-3xl"
          
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className=" mb-4 ml-14 mt-12 "
          >
            Hey buddy,<br />
            I’m really sorry you’re feeling like this right now. I just want you to know—you’re gonna be okay. Seriously. This feeling? It’ll pass. You’re safe, you’re not alone, and most importantly—you are enough, exactly as you are. No need to fix or change anything about yourself right now. Just breathe with me, okay? 🫶
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className=" mb-4 ml-14"
          >
            Find a cozy little spot—maybe your bed, your couch, even the floor if that’s where you feel comfy. Wrap yourself up in something soft if you can. Now, hand on your heart, other on your belly. Deep breath in through your nose… 1… 2… 3… 4… hold it… and exhale slowly through your mouth… 6… 5… 4… 3… 2… 1… Nice. Let’s do that a couple more times. You’re doing amazing. 🌬️
          </motion.p>

          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className=" mb-4 ml-14"
          >
            Now gently look around you—name three things you can see (maybe your pillow, a photo, your cup?), two things you can hear (the fan? birds? silence?), and one thing you can feel (your blanket, the floor, your breath). This is you coming back to the now. And right now? You’re safe. 🧸🪷
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className=" mb-4 italic ml-14"
          >
            Whisper this to yourself (or say it out loud if you want!):<br />
            “I am safe. I am enough. It’s okay to feel this. I’ve got me.”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className=" mb-4 ml-14"
          >
            Let those words wrap around you like the warmest, fluffiest blanket ever. 🤍✨
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className=" mb-4 ml-14"
          >
            Now imagine a soft golden light—like sunlight peeking through clouds—gently pouring over you. From your head… down to your chest… your arms… your legs… all the way to your toes. It’s warm, calm, and safe. It’s like the universe itself is giving you a little hug. 🌞
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className=" mb-4 ml-14"
          >
            This feeling might feel huge right now, but it’s just a wave. And waves always pass. You’ve gotten through every single one before—every tough moment, every panic—and you’ll get through this too. You're stronger than your thoughts. 🌊💪
          </motion.p>

          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className=" mb-4 ml-14"
          >
            You don’t have to reach out to anyone right now, but you can if you want. But also—you’re enough all by yourself. You’ve got this. You really do. And I’m so, so proud of you for just breathing and reading this. That’s already a win. 🫂
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="mb-4 ml-14"
          >
            Take another breath. Take your time. Be gentle with yourself. Everything’s gonna be okay. Promise.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.9, duration: 0.8 }}
            className=" font-bold ml-14"
          >
            Big warm hug, <br />
            Your Friend <br/>Relevia 💛
          </motion.p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className="text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-3xl md:text-4xl font-heading text-neutral-900 mb-6">
            Lets bein the journey to calm...
          </motion.h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {[
              { to: '/about', text: 'Discover Resources', bg: 'primary' },
              { to: '/contact', text: 'Connect With Us', bg: 'secondary' }
            ].map((btn, i) => (
              <motion.div key={i} whileHover={{ scale: 1.08, rotate: 1 }} whileTap={{ scale: 0.95 }}>
                <Link to={btn.to} className={`bg-${btn.bg}-600 text-primary px-8 py-4 rounded-full font-body text-lg shadow-soft hover:bg-${btn.bg}-700 transition-all duration-300`}>
                  {btn.text}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <motion.div className="absolute left-12 bottom-12 w-5 h-5 bg-primary-400 rounded-full" animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute right-16 bottom-10 w-7 h-7 bg-secondary-400 rounded-full" animate={{ y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
      </motion.div>
    </div>
  )
}

export default Home