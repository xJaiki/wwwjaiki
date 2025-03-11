import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Heart, Pizza, Gamepad, Battery, CarFront, HeartCrack, Book, Video, UserMinus, User, Bike, Headphones } from 'lucide-react';

const LikesAndDislikes = () => {
  const [leftPosition, setLeftPosition] = useState(0);
  const [hoverItem, setHoverItem] = useState(null);
  const [energyLevel, setEnergyLevel] = useState(85);
  const pageRef = useRef(null);

  // Animation variants
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
    hidden: { y: 40, opacity: 0, rotate: -1 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  // Decrease energy level when hovering over energy drinks
  useEffect(() => {
    if (hoverItem === 'energy') {
      const interval = setInterval(() => {
        setEnergyLevel(prev => Math.max(prev - 1, 0));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setEnergyLevel(85);
    }
  }, [hoverItem]);

  // Calculate the distance from left edge
  useEffect(() => {
    const calculateLeftPosition = () => {
      if (pageRef.current) {
        const rect = pageRef.current.getBoundingClientRect();
        setLeftPosition(-rect.left);
      }
    };

    calculateLeftPosition();
    window.addEventListener('resize', calculateLeftPosition);

    return () => {
      window.removeEventListener('resize', calculateLeftPosition);
    };
  }, []);

  const likes = [
    { 
      id: 'yellow', 
      title: 'YELLOW COLOR', 
      icon: null,
      description: 'It\'s like sunshine but without the skin cancer risk. If I could paint my whole life yellow, I would. And then I\'d need sunglasses indoors.',
      style: { color: '#FFD700', fontWeight: 'bold' }
    },
    { 
      id: 'pizza', 
      title: 'Pizza Experimentation', 
      icon: <Pizza />,
      description: 'I never order the same pizza twice. My quest for the perfect topping combination is my life\'s work. Nope, I didn\'t try yet pineapple pizza. I have standards.'
    },
    { 
      id: 'gf', 
      title: 'My Girlfriend', 
      icon: <Heart fill="#ff6b6b" />,
      description: 'She laughs at my jokes even when they\'re not funny and tolerates me talking about Halo lore for hours. Also, she definitely forced me to add this to the list. (Help me)'
    },
    { 
      id: 'chief', 
      title: 'Master Chief', 
      description: 'The man, the myth, the legend. If I could have one fictional character as my wingman in real life, it\'d be John-117. Sorry all other video game protagonists.'
    },
    { 
      id: 'games', 
      title: 'Videogames', 
      icon: <Gamepad />,
      description: 'I only play games where I can shoot things or drive fast cars. RPGs with 50-hour tutorials? No thanks. I\'m here to crash cars and shooting, not read dialogue trees.'
    },
    { 
      id: 'energy', 
      title: 'Energy Drinks', 
      icon: <Battery />,
      description: 'My heart: "Please stop" | Me: "Haha energy drink go brrrrr" | Doctor: "Why are you like this?"',
      extra: true
    },
    { 
      id: 'cars', 
      title: 'Cars', 
      icon: <CarFront />,
      description: 'I love both the Pixar movie (Ka-chow!) and actual cars. Though I draw the line at having a Lightning McQueen body pillow. That would be weird... right?'
    },
    { 
      id: 'oculus', 
      title: 'My 2006 Toyota Yaris', 
      icon: null,
      description: 'It\'s not the fastest, the prettiest, or the most comfortable. But it\'s mine. And it has a dents. And sometimes it starts on the first try. (I love you, Yaris)'
    }
  ];

  const dislikes = [
    { 
      id: 'reading', 
      title: 'Reading', 
      icon: <Book />,
      description: 'Books are just movies where your brain has to do all the CGI work. No thanks. If I wanted homework, I\'d go back to school.'
    },
    { 
      id: 'mukbang', 
      title: 'Mukbang', 
      icon: <Video />,
      description: 'Why would I want to watch someone else eat? It\'s like watching someone else play a video game... no, i don\'t even understand that either. I just don\'t get it.'
    },
    { 
      id: 'loneliness', 
      title: 'Loneliness', 
      icon: <UserMinus />,
      description: 'Being alone is fine for a while, but after a few hours I start talking to myself. And then I start arguing with myself. And then I lose the argument.'
    },
    { 
      id: 'cluster', 
      title: 'My friend Cluster', 
      icon: <User />,
      description: 'Idk, he just sucks. He\'s always late, he never let me win at 8-ball. I don\'t even know why I keep him around. (I love you, Cluster)'
    },
    { 
      id: 'vn', 
      title: 'Visual Novel', 
      icon: null,
      description: 'I don\'t want to read a book OR press a button to turn the page. "But the multiple endings!" Just watch all the endings on YouTube like a normal person.'
    },
    { 
      id: 'motorbikes', 
      title: 'Motorbikes', 
      icon: <Bike />,
      description: 'Cars have doors, roofs, and don\'t require you to dress like a Power Ranger just to go to the grocery store. Case closed.'
    }
  ];

  const renderItems = (items, isLikes) => {
    return items.map((item) => (
      <div 
        key={item.id}
        className={`px-4 border-l-4 mb-3 bg-white relative transition-all duration-300 ${isLikes ? 'border-primary' : 'border-gray-500'}`}
        onMouseEnter={() => setHoverItem(item.id)}
        onMouseLeave={() => setHoverItem(null)}
        style={{
          transform: hoverItem === item.id ? 'translateX(8px)' : 'none'
        }}
      >
        <div className="flex items-center gap-3">
          {item.icon && <span className={isLikes ? 'text-primary' : 'text-gray-500'}>{item.icon}</span>}
          <h3 className="text-lg font-medium" style={item.style || {}}>
            {item.title}
          </h3>
        </div>
        <p className="font-light mt-1 text-gray-700">
          {item.description}
        </p>
        
        {item.extra && item.id === 'energy' && (
          <div className="mt-2">
            <p className="text-xs mb-1">Heart health remaining:</p>
            <div className="w-full bg-gray-200 h-2">
              <div 
                className={`h-2 transition-all duration-300 ${energyLevel < 30 ? 'bg-red-500' : 'bg-primary'}`} 
                style={{ width: `${energyLevel}%` }}
              ></div>
            </div>
            {energyLevel < 30 && (
              <p className="text-xs text-red-500 mt-1 animate-pulse">WARNING: Critical levels</p>
            )}
          </div>
        )}
      </div>
    ));
  };

  return (
    <motion.div
      className="likes-dislikes-page max-w-4xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      ref={pageRef}
    >
      <div className="relative">
        {/* Red bar */}
        <div
          className="absolute top-0 bottom-0 w-1 md:w-2 bg-primary"
          style={{
            left: `${leftPosition}px`
          }}
        />

        <div className="pl-0">
          {/* Likes Section */}
          <motion.div
            className="mb-12"
            variants={itemVariants}
          >
            <h1 className="text-6xl font-light text-primary mb-6 flex items-center gap-3">
              Likes
            </h1>
            
            <div className="likes-list">
              {renderItems(likes, true)}
            </div>
          </motion.div>

          {/* Dislikes Section */}
          <motion.div
            variants={itemVariants}
          >
            <h1 className="text-6xl font-light text-gray-700 mb-6 flex items-center gap-3">
              Dislikes
            </h1>
            
            <div className="dislikes-list">
              {renderItems(dislikes, false)}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Funny footer note */}
      <motion.p
        variants={itemVariants}
        className="text-xs text-gray-400 mt-8 italic pl-8"
      >
        * Any opinion expressed here is 100% correct and should be taken as fact. (don't)
      </motion.p>
    </motion.div>
  );
};

export default LikesAndDislikes;