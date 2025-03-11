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
      name: "Phylla",
      description: "For when your brain needs to dissolve into sonic oblivion",
      embedUrl: "https://open.spotify.com/embed/playlist/6N8d8TukwqCj2Wv6KU0agZ?utm_source=generator",
      color: "#7B68EE" // Medium purple for that psychedelic edge
    },
    {
      name: "Zune 30",
      description: "Soundtrack to your childhood trauma disguised as gaming nostalgia",
      embedUrl: "https://open.spotify.com/embed/playlist/3pAyJRk0Isdn5UUp7EZyQr?utm_source=generator",
      color: "#FF4500" // Burnt orange like your dreams
    },
    {
      name: "Millennium Edition",
      description: "For coding until your eyes bleed and your fingers go numb",
      embedUrl: "https://open.spotify.com/embed/playlist/4o25KNg4YILk0Oh45BadN6?utm_source=generator",
      color: "#4682B4" // Steel blue like the cold void of your screen
    },
    {
      name: "speed.exe",
      description: "When caffeine fails and sleep is for the weak",
      embedUrl: "https://open.spotify.com/embed/playlist/1buboCwFPSFS5e3MylXpaf?utm_source=generator",
      color: "#32CD32" // Toxic green for your poisoned productivity
    },
    {
      name: "\"House Party\"",
      description: "For pretending to be social while silently judging everyone",
      embedUrl: "https://open.spotify.com/embed/playlist/5fqkQ3DzVkLF4ROXLXj2Wj?utm_source=generator",
      color: "#DA70D6" // Orchid purple for fake smiles and inner darkness
    },
    {
      name: "Metal (API)",
      description: "Breaking systems and eardrums with technical precision",
      embedUrl: "https://open.spotify.com/embed/playlist/0Jr0txNaW8RZwhPmJGztl1?utm_source=generator",
      color: "#708090" // Slate gray like the soul of your machine
    },
    {
      name: "moricons.dll",
      description: "Digital artifacts from when the internet was still dangerous",
      embedUrl: "https://open.spotify.com/embed/playlist/18DRYlllqslRTvhrbZERd5?utm_source=generator",
      color: "#20B2AA" // Retro teal that screams 'I was online before it was cool'
    },
    {
      name: "ISDone.dll",
      description: "Sounds for when you've given up but still need to deliver",
      embedUrl: "https://open.spotify.com/embed/playlist/3KX7QcOdfhyjwjElz6Fihy?utm_source=generator",
      color: "#B8860B" // Dark gold like your fading ambitions
    },
    {
      name: "Hetalia",
      description: "Cultural appropriation in audio form - no regrets",
      embedUrl: "https://open.spotify.com/embed/playlist/6LedQHNqctSZkQcCfSE2rq?utm_source=generator",
      color: "#CD5C5C" // Indie red for your alternative personality
    },
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
      name: "Gorillaz",
      image: "",
    },
    {
      name: "Kanye West",
      image: "",
    },
    {
      name: "Childish Gambino",
      image: "",
    },
    {
      name: "Kendrick Lamar",
      image: "",
    },
    {
      name: "Metronomy",
      image: "",
    },
    {
      name: "Calcutta",
      image: "",
    },
    {
      name: "ScHoolboy Q",
      image: "",
    },
    {
      name: "Led Zeppelin",
      image: "",
    },
    {
      name: "Red Hot Chili Peppers",
      image: "",
    }
  ];

  // Tabs config
  const tabs = [
    { id: 'playlists', label: 'Playlists', icon: <Disc /> },
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
      <motion.h1
        className="text-6xl font-light text-primary mb-6 flex items-center gap-3"
        variants={itemVariants}
      >
        Music
      </motion.h1>
      <div className="relative mb-8">
        {/* Red bar */}
        <div
          className="absolute top-0 bottom-0 w-1 md:w-2 bg-primary"
          style={{
            left: `${leftPosition}px`
          }}
        />

        <div className="pl-0">


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
                  className={`px-6 py-3 mr-2 flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === tab.id
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
                      href="https://open.spotify.com/user/1187721300?si=4854eaf3a38f43b3"
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