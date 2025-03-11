import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Music as MusicIcon, Disc, Radio, User, Heart, Volume2 } from 'lucide-react';

const Music = () => {
  const [leftPosition, setLeftPosition] = useState(0);
  const [activeTab, setActiveTab] = useState('playlists');
  const pageRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

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

  // Music data
  const playlists = [
    {
      name: "Gaming Session Mix",
      description: "Perfect for intense gaming sessions and rage quitting in style",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DWWxPM4nWdhyI?utm_source=generator",
      color: "#1DB954" // Spotify green
    },
    {
      name: "Retro Gaming Soundtracks",
      description: "Nostalgia in audio form - all the classics from my favorite games",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdLEN7aqioXM?utm_source=generator",
      color: "#e91e63" // Pink
    },
    {
      name: "Coding Focus",
      description: "When I need to focus and write code without losing my mind",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX5trt9i14X7j?utm_source=generator",
      color: "#2196f3" // Blue
    },
    {
      name: "Energy Boost",
      description: "For when even Monster Energy isn't enough",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4eRPd9frC1m?utm_source=generator", 
      color: "#ff9800" // Orange
    }
  ];

  const genres = [
    { name: "Electronic", count: 432, color: "#3f51b5" },
    { name: "Rock", count: 267, color: "#f44336" },
    { name: "Hip Hop", count: 189, color: "#9c27b0" },
    { name: "Soundtrack", count: 145, color: "#009688" },
    { name: "Metal", count: 112, color: "#607d8b" },
    { name: "Indie", count: 98, color: "#ff5722" },
    { name: "Lo-fi", count: 76, color: "#795548" },
    { name: "Jazz", count: 43, color: "#ffc107" },
    { name: "Classical", count: 29, color: "#8bc34a" }
  ];

  const artists = [
    { 
      name: "Daft Punk", 
      image: "https://i.imgur.com/JaUMTsA.jpg", 
      desc: "French electronic music duo formed in 1993. Their music makes coding at 3 AM feel like a cinematic experience."
    },
    { 
      name: "Tame Impala", 
      image: "https://i.imgur.com/8gBeWbS.jpg", 
      desc: "Australian music project by Kevin Parker. Perfect soundtrack for pretending I'm cooler than I actually am."
    },
    { 
      name: "Radiohead", 
      image: "https://i.imgur.com/lQ7a9HD.jpg", 
      desc: "English rock band formed in 1985. For when I'm feeling existential about why my code won't compile."
    },
    { 
      name: "Carpenter Brut", 
      image: "https://i.imgur.com/5jJVwFo.jpg", 
      desc: "French synthwave artist. Makes me feel like I'm in an 80s action movie while I take out the trash."
    },
    { 
      name: "Kendrick Lamar", 
      image: "https://i.imgur.com/Rb7ca2D.jpg", 
      desc: "American rapper and songwriter. His lyrics are deeper than the nested if statements in my code."
    }
  ];

  // Tabs config
  const tabs = [
    { id: 'playlists', label: 'Playlists', icon: <Disc /> },
    { id: 'genres', label: 'Genres', icon: <Radio /> },
    { id: 'artists', label: 'Artists', icon: <User /> }
  ];

  return (
    <motion.div
      className="music-page max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      ref={pageRef}
    >
      <div className="relative mb-8">
        {/* Red bar */}
        <div
          className="absolute top-0 bottom-0 w-1 md:w-2 bg-primary"
          style={{
            left: `${leftPosition}px`
          }}
        />

        <div className="pl-8">
          <motion.h1
            className="text-6xl font-light text-primary mb-6 flex items-center gap-3"
            variants={itemVariants}
          >
            Music <MusicIcon className="h-10 w-10" />
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl font-light mb-8">
            My soundtrack for coding, gaming, and pretending I have good taste.
          </motion.p>

          {/* Now Playing - Spotify Status */}
          <motion.div 
            variants={itemVariants}
            className="bg-white border-l-4 border-[#1DB954] p-4 mb-8 flex items-center gap-3"
          >
            <Volume2 className="text-[#1DB954]" />
            <div>
              <p className="text-sm text-gray-500">Now Playing</p>
              <p className="font-medium">Connect with Spotify to show what I'm listening to right now!</p>
            </div>
          </motion.div>

          {/* Tabs navigation */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex overflow-x-auto pb-2 hide-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`px-6 py-3 mr-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-primary text-white font-medium' 
                      : 'bg-white border-2 border-gray-200 hover:border-primary'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content based on active tab */}
          <div className="tab-content">
            {/* Playlists Tab */}
            {activeTab === 'playlists' && (
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-medium">My Playlists</h2>
                  <p className="text-sm">
                    <a 
                      href="https://open.spotify.com/user/your-profile" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Follow me on Spotify
                      <Heart className="h-4 w-4" />
                    </a>
                  </p>
                </div>
                
                <div className="space-y-8">
                  {playlists.map((playlist, index) => (
                    <div key={index} className="bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          className="w-3 h-12" 
                          style={{ backgroundColor: playlist.color }}
                        ></div>
                        <div>
                          <h3 className="text-lg font-medium">{playlist.name}</h3>
                          <p className="text-sm text-gray-600">{playlist.description}</p>
                        </div>
                      </div>
                      <div className="rounded overflow-hidden h-[352px]">
                        <iframe
                          src={playlist.embedUrl}
                          width="100%"
                          height="352"
                          frameBorder="0"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          title={playlist.name}
                        ></iframe>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Genres Tab */}
            {activeTab === 'genres' && (
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-medium">Genres I Listen To</h2>
                  <p className="text-lg">Total tracks: 1,391</p>
                </div>
                
                <div className="bg-white p-4 border-l-4 border-primary mb-6">
                  <p className="font-medium mb-1">Music Taste Disclaimer</p>
                  <p className="text-sm">Yes, I know my music taste is all over the place. No, I will not apologize for it.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {genres.map((genre, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-4 hover:shadow-md transition-shadow"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">{genre.name}</h3>
                        <span className="text-sm text-gray-500">{genre.count} tracks</span>
                      </div>
                      <div className="w-full bg-gray-200 h-4 rounded-sm overflow-hidden">
                        <div
                          className="h-4"
                          style={{ 
                            width: `${(genre.count / 500) * 100}%`,
                            backgroundColor: genre.color
                          }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Artists Tab */}
            {activeTab === 'artists' && (
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-medium">Favorite Artists</h2>
                </div>
                
                <div className="space-y-6">
                  {artists.map((artist, index) => (
                    <motion.div
                      key={index}
                      className="bg-white hover:shadow-md transition-shadow overflow-hidden"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/4 h-48 md:h-auto overflow-hidden">
                          <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-full md:w-3/4 p-4">
                          <h3 className="text-lg font-medium mb-2">{artist.name}</h3>
                          <p className="text-sm">{artist.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500 italic">
                    Stats based on my last 6 months of listening. Yes, I'm aware this makes me look like a hipster.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <motion.p
        variants={itemVariants}
        className="pl-8 text-xs text-gray-500 italic mt-8"
      >
        * Music taste subject to change based on which phase of my life I'm currently regretting
      </motion.p>
    </motion.div>
  );
};

export default Music;