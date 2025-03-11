import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Coffee, Battery, BatteryCharging, Brain, Code, Pizza } from 'lucide-react';

const Welcome = () => {
  const [leftPosition, setLeftPosition] = useState(0);
  const welcomeRef = useRef(null);

  // Get random funny status
  const funnyStatuses = [
    "Currently in a staring contest with my code editor, I'm winning (for now)",
    "Working on projects at 3AM because why not (send help)",
    "Listening to the same Kanye West song for the 100th time today (still good)",
    "Contemplating if this red bull is worth the heart palpitations (it is)",
    "Setting up yet another side project I might finish someday (probably not)",
    "Trying to figure out how to make my code work without breaking everything",
    "Thinking about the next feature I'll add to this website (i have no idea)",
    "Wondering if I should get a coffee or take a nap (probably both)",
    "Using Arch btw (just kidding, using Windows tbh)",
    "Doing something productive (I'm procrastinating)",
    "Finishing Halo 3 for the 100th time (still a great game)",
    "Playing GTA San Andreas for the 1000th time (still a great game)",
    "Thinking about the next game I'll play (probably GTA San Andreas again)",
    "Thinking about Cortana (the Halo one, not the Windows one)",
    "Watching pigeons outside my window (they're up to something)",
    "Wondering if I should get a pigeon (YES)",
    "Wondering if getting a chicken is a good idea (probably yes)"
  ];

  const randomStatus = funnyStatuses[Math.floor(Math.random() * funnyStatuses.length)];

  // Animation variants with edgier effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  // Calculate the distance from left edge
  useEffect(() => {
    const calculateLeftPosition = () => {
      if (welcomeRef.current) {
        const rect = welcomeRef.current.getBoundingClientRect();
        setLeftPosition(-rect.left);
      }
    };

    calculateLeftPosition();
    window.addEventListener('resize', calculateLeftPosition);

    return () => {
      window.removeEventListener('resize', calculateLeftPosition);
    };
  }, []);

  return (
    <motion.div
      className="welcome-page max-w-4xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      ref={welcomeRef}
    >
      <motion.div
        className="relative mb-2 inline-block"
        variants={itemVariants}
      >
        <h1 className="text-6xl md:text-7xl font-light text-primary">
          Where am I?
        </h1>
      </motion.div>

      <div className="relative">
        {/* Edgier red bar with diagonal pattern */}
        <div
          className="absolute top-0 bottom-0 w-1 md:w-2 bg-primary"
          style={{
            left: `${leftPosition}px`
          }}
        />



        {/* Intro text */}
        <motion.div variants={itemVariants}>
          <p className="text-2xl mb-4 font-light">
            Just another corner of the internet I've claimed as mine, welcome to my digital playground where I share things that matter to me.
          </p>
        </motion.div>

        {/* Current Status - Funny section */}
        <motion.div
          variants={itemVariants}
          className="mb-8 bg-white p-4 py-1 border-l-4 border-primary"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <h2 className="text-lg font-light">Current status:</h2>
          </div>

          <div className="flex items-center gap-2 text-lg">
            <Coffee className="text-primary" />
            <p>{randomStatus}</p>
          </div>
        </motion.div>

        {/* Funny stats with silly metrics */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-3 mb-2 font-light"
        >
          <div className="bg-font-white py-4 px-0 border-t-4 border-primary">
            <div className="flex justify-between items-center mb-1">
              <h3 className=" text-xs font-medium">Coffeine consuption</h3>
              <Battery className="text-primary" />
            </div>
            <div className="w-full bg-gray-200 h-3">
              <div className="bg-primary h-3" style={{ width: '87%' }}></div>
            </div>
            <p className="text-right text-xs md:text-sm mt-1">87% (critical)</p>
          </div>

          <div className="bg-font-white py-4 px-0 border-t-4 border-primary">
            <div className="flex justify-between items-center mb-1">
              <h3 className=" text-xs font-medium">Braincell status</h3>
              <Brain className="text-primary" />
            </div>
            <div className="w-full bg-gray-200 h-3">
              <div className="bg-primary h-3" style={{ width: '42%' }}></div>
            </div>
            <p className="text-right text-xs md:text-sm mt-1">23% (not good)</p>
          </div>

          <div className="bg-font-white py-4 px-0 border-t-4 border-primary">
            <div className="flex justify-between items-center mb-1">
              <h3 className=" text-xs font-medium">Code skill <span className="text-gray-500">*</span></h3>
              <Code className="text-primary" />
            </div>
            <div className="w-full bg-gray-200 h-3">
              <div className="bg-primary h-3 " style={{ width: '69%' }}></div>
            </div>
            <p className="text-right text-xs md:text-sm mt-1">69% (nice)</p>
          </div>

          <div className="bg-font-white py-4 px-0 border-t-4 border-primary">
            <div className="flex justify-between items-center mb-1">
              <h3 className=" text-xs font-medium">Pizza reserve</h3>
              <Pizza className="text-primary" />
            </div>
            <div className="w-full bg-gray-200 h-3">
              <div className="bg-primary h-3" style={{ width: '12%' }}></div>
            </div>
            <p className="text-right text-xs md:text-xs md:text-sm mt-1">12% (need to call a rider!)</p>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div variants={itemVariants} className="mb-4">
          <p className="text-lg mb-4 font-light">
            While you're here, feel free to explore everything this place has to offer. I'm not
            responsible for any weird stuff you might find.<br /> Just kidding, I totally am.
          </p>
        </motion.div>


      </div>
      {/* Random footer note */}
      <motion.p
        variants={itemVariants}
        className="text-xs text-gray-400 mt-8 italic"
      >
        * Website made with exactly 37% effort and questionable design choices (i love it)
      </motion.p>
    </motion.div>
  );
};

export default Welcome;