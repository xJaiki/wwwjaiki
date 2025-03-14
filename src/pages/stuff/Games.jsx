import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Gamepad, Clock, Award, Star, BarChart2, Trophy, Bookmark, Calendar } from 'lucide-react';
import Papa from 'papaparse';

const Games = () => {
  const [steamData, setSteamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [leftPosition, setLeftPosition] = useState(0);
  const [stats, setStats] = useState({
    totalGames: 0,
    totalPlaytime: 0,
    mostPlayedGame: { name: '', hours: 0 },
    topGenres: [],
    playtimeByYear: []
  });

  const pageRef = useRef(null);

  // Favorite games data hardcoded
  const favoriteGames = [
    {
      name: "Halo 2",
      description: "The definitive Halo experience. I've completed the campaign over 30000 times and still get chills during the 'Delta Halo' mission ! (never finished a legendary run tho)",
      image: "https://upload.wikimedia.org/wikipedia/en/9/92/Halo2-cover.png",
      played: "Xbox Original",
      releaseYear: 2004,
      developer: "Bungie"
    },
    {
      name: "GTA San Andreas",
      description: "Good music, good story, good gameplay. Grand Theft Auto: San Andreas is the best game in the series, and it's not even close. I've completed the game too many times to count. Also really great memories of playing MTA with friends. This is one of the games that i played the most in my life.",
      image: "https://upload.wikimedia.org/wikipedia/en/c/c4/GTASABOX.jpg",
      played: "PC, Xbox, Mobile",
      releaseYear: 2004,
      developer: "Rockstar North"
    },
    {
      name: "Need for Speed Underground 2",
      description: "The perfect racing game with the best customization system ever made. I still listen to Riders on the Storm whenever it rains. Bayview is my second home.",
      image: "https://upload.wikimedia.org/wikipedia/en/1/10/Nfsu2-win-cover.jpg",
      played: "PC, PS2",
      releaseYear: 2004,
      developer: "EA Black Box"
    }
  ];

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

  // Load and process Steam data
  // Load and process Steam data
  useEffect(() => {
    const loadSteamData = async () => {
      try {
        setLoading(true);
        // Fetch the CSV file
        const response = await fetch('steam_games_analysis_20250311_150824.csv');
        const csvText = await response.text();

        // Parse the CSV data
        const result = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        });

        const data = result.data;

        // Calculate stats
        const totalGames = data.length;
        const totalPlaytime = data.reduce((sum, game) => sum + (game.playtime_hours || 0), 0);

        // Find most played game
        const sortedByPlaytime = [...data].sort((a, b) => (b.playtime_hours || 0) - (a.playtime_hours || 0));
        const mostPlayedGame = sortedByPlaytime[0] || { name: 'None', playtime_hours: 0 };

        // Count genres
        const genreCounts = {};
        data.forEach(game => {
          if (game.genres) {
            const genres = game.genres.split(', ');
            genres.forEach(genre => {
              if (!genreCounts[genre]) {
                genreCounts[genre] = 0;
              }
              genreCounts[genre]++;
            });
          }
        });

        // Get top genres
        const topGenres = Object.entries(genreCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([genre, count]) => ({ genre, count }));

        // Get playtime by year
        const playtimeByYear = {};
        data.forEach(game => {
          if (game.release_year && !isNaN(game.release_year)) {
            const year = Math.floor(game.release_year);
            if (!playtimeByYear[year]) {
              playtimeByYear[year] = 0;
            }
            playtimeByYear[year] += game.playtime_hours || 0;
          }
        });

        // Convert to array and sort
        const playtimeByYearArray = Object.entries(playtimeByYear)
          .map(([year, hours]) => ({ year: parseInt(year), hours }))
          .sort((a, b) => a.year - b.year);

        setStats({
          totalGames,
          totalPlaytime,
          mostPlayedGame: {
            name: mostPlayedGame.name,
            hours: mostPlayedGame.playtime_hours || 0
          },
          topGenres,
          playtimeByYear: playtimeByYearArray
        });

        setSteamData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading Steam data:", error);
        setLoading(false);

        // Fallback to sample data if file reading fails
        const sampleData = [
          { name: "Counter-Strike 2", playtime_hours: 1242.9 },
          { name: "Team Fortress 2", playtime_hours: 959.7 },
          { name: "Grand Theft Auto V", playtime_hours: 670.7 },
          { name: "Warframe", playtime_hours: 424.1 },
          { name: "Halo Infinite", playtime_hours: 140.6 }
        ];

        setSteamData(sampleData);
        setStats({
          totalGames: 696,
          totalPlaytime: 7612.5,
          mostPlayedGame: {
            name: "Counter-Strike 2",
            hours: 1242.9
          },
          topGenres: [
            { genre: "Action", count: 397 },
            { genre: "Indie", count: 243 },
            { genre: "Adventure", count: 189 },
            { genre: "RPG", count: 133 },
            { genre: "Casual", count: 126 }
          ],
          playtimeByYear: [
            { year: 2015, hours: 1035.1 },
            { year: 2012, hours: 1501.3 },
            { year: 2007, hours: 978.3 },
            { year: 2018, hours: 628.1 },
            { year: 2013, hours: 566.6 }
          ]
        });
      }
    };

    loadSteamData();
  }, []);

  // Tabs config
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart2 /> },
    { id: 'favorites', label: 'Favorites', icon: <Star /> },
    { id: 'steam', label: 'Steam Library', icon: <Gamepad /> },
    { id: 'stats', label: 'Gaming Stats', icon: <Trophy /> },
    { id: 'retro', label: 'RetroAchievement', icon: <Bookmark /> }
  ];

  // Render top games by playtime
  const renderTopGames = () => {
    if (loading || !steamData.length) return <p>Loading top games...</p>;
    const topGames = [...steamData]
      .sort((a, b) => (b.playtime_hours || 0) - (a.playtime_hours || 0))
      .slice(0, 10);

    return (
      <div className="space-y-2">
        {topGames.map((game, index) => (
          <div
            key={index}
            className="flex items-center bg-white p-2 border-l-4 border-primary"
          >
            <div className="mr-4 font-bold text-xl text-gray-400 w-6 text-center">{index + 1}</div>
            <div className="flex-grow">
              <p className="font-medium">{game.name}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {game.playtime_hours?.toFixed(1) || 0} hours
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render release year distribution
  const renderYearDistribution = () => {
    if (loading || !stats.playtimeByYear.length) return <p>Loading year data...</p>;

    const recentYears = stats.playtimeByYear
      .filter(item => item.year >= 2010)
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 8);

    const maxHours = Math.max(...recentYears.map(item => item.hours));

    return (
      <div className="space-y-2">
        {recentYears.map((item, index) => (
          <div key={index} className="bg-white p-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{item.year}</span>
              <span className="text-sm">{item.hours.toFixed(0)} hours</span>
            </div>
            <div className="w-full bg-gray-200 h-2">
              <div
                className="bg-primary h-2"
                style={{ width: `${(item.hours / maxHours) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="games-page max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      ref={pageRef}
    >
      <motion.h1
        className="text-6xl font-light text-primary mb-6 flex items-end gap-3"
        variants={itemVariants}
      >
        Games <span className="text-xs  md:text-lg text-gray-500">- last updated March 11, 2025</span>
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
          <motion.p variants={itemVariants} className="text-xl font-light mb-0">
            My digital playground where I've spent thousands of hours instead of going outside.
          </motion.p>
          <motion.p variants={itemVariants} className="text-sm font-light mb-0">
            If you are asking how i got this data, i used Claude (i'm lazy) to create a python script that scrapes my steam library and then i used it to create a csv file with the data.
          </motion.p>
          <motion.p variants={itemVariants} className="text-sm font-light mb-4">
            If you want to download the script you can do it
            <button
              className="mx-1 font-medium cursor-pointer underline decoration-dashed decoration-primary"
              onClick={() => window.open('script.py')}
            >here</button>i don't assume any responsability for the use of this script, also because i didn't wrote it.
          </motion.p>

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
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div variants={itemVariants}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Steam stats card */}
                  <div className="bg-white p-6 shadow-sm border-t-4 border-primary">
                    <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                      <Gamepad className="text-primary" />
                      Steam Library Stats
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Total Games</p>
                        <p className="text-3xl font-light">{loading ? '...' : stats.totalGames}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Total Playtime</p>
                        <p className="text-3xl font-light">
                          {loading ? '...' : Math.floor(stats.totalPlaytime)} hours
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Most Played Game</p>
                        <p className="text-xl font-light">
                          {loading ? '...' : stats.mostPlayedGame.name}
                          <span className="text-sm text-gray-500 ml-2">
                            ({loading ? '...' : Math.floor(stats.mostPlayedGame.hours)} hours)
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Favorite games */}
                  <div className="bg-white p-6 shadow-sm border-t-4 border-primary">
                    <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                      <Star className="text-primary" />
                      All-Time Favorites
                    </h3>

                    <div className="space-y-2">
                      {favoriteGames.map((game, index) => (
                        <div key={index} className="flex items-center">
                          <div className="mr-2 text-primary">
                            <Trophy className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{game.name}</p>
                            <p className="text-sm text-gray-500">{game.releaseYear} • {game.developer}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      className="mt-4 text-primary text-sm flex items-center gap-1"
                      onClick={() => setActiveTab('favorites')}
                    >
                      See details
                      <span>→</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Top played games */}
                  <div className="bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                      <Clock className="text-primary" />
                      Most Played on Steam
                    </h3>
                    {renderTopGames()}
                  </div>

                  {/* Playtime by release year */}
                  <div className="bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                      <Calendar className="text-primary" />
                      Playtime by Release Year
                    </h3>
                    {renderYearDistribution()}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-medium mb-6">All-Time Favorite Games</h2>

                <div className="space-y-8">
                  {favoriteGames.map((game, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 border-l-4 border-primary flex flex-col md:flex-row gap-6"
                    >
                      <div className="md:w-1/3">
                        <img
                          src={game.image}
                          alt={game.name}
                          className="w-full h-auto object-cover"
                        />
                      </div>

                      <div className="md:w-2/3">
                        <h3 className="text-2xl font-medium mb-2">{game.name}</h3>
                        <div className="flex items-center mb-4 text-sm">
                          <span className="bg-primary text-white px-2 py-1 mr-2">
                            {game.releaseYear}
                          </span>
                          <span className="text-gray-500">
                            {game.developer}
                          </span>
                        </div>

                        <p className="text-gray-700 mb-4">
                          {game.description}
                        </p>

                        <div className="flex items-center text-sm text-gray-500">
                          <Gamepad className="h-4 w-4 mr-1" />
                          <span>Played on: {game.played}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-white border-l-4 border-primary">
                  <h2 className="text-2xl font-medium mb-6">Honorable Mentions</h2>
                  <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <li>Halo 3</li>
                    <li>Need for Speed: Most Wanted</li>
                    <li>GTA Vice City</li>
                    <li>Counter-Strike 2</li>
                    <li>Portal 2</li>
                    <li>Fallout: New Vegas</li>
                    <li>The Elder Scrolls V: Skyrim</li>
                    <li>Borderlands 2</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Steam Library Tab */}
            {activeTab === 'steam' && (
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-medium">Steam Library</h2>
                  {!loading && <p className="text-lg">{stats.totalGames} Games • {Math.floor(stats.totalPlaytime)} Hours</p>}
                </div>

                {loading ? (
                  <div className="bg-white p-6 text-center">
                    <p>Loading Steam library data...</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {steamData
                        .filter(game => game.playtime_hours > 20)
                        .sort((a, b) => b.playtime_hours - a.playtime_hours)
                        .slice(0, 12)
                        .map((game, index) => (
                          <div key={index} className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <img
                              src={game.image_url || 'https://via.placeholder.com/300x100?text=Game+Image'}
                              alt={game.name}
                              className="w-full h-32 object-cover"
                            />
                            <div className="p-4">
                              <h3 className="font-medium truncate" title={game.name}>{game.name}</h3>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                  {game.playtime_hours?.toFixed(1) || 0} hours
                                </span>
                                {game.review_score_desc && (
                                  <span className={`${game.review_score_desc.includes('Positive') ? 'text-green-600' :
                                    game.review_score_desc.includes('Mixed') ? 'text-yellow-600' :
                                      'text-red-600'
                                    }`}>
                                    {game.review_score_desc}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="bg-white p-6 border-t-4 border-primary mb-8">
                      <h3 className="font-medium mb-4">Top Genres in My Library</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {stats.topGenres.map((item, index) => (
                          <div key={index} className="p-4 bg-gray-50 border-l-2 border-primary">
                            <h4 className="font-medium">{item.genre}</h4>
                            <p className="text-sm text-gray-500">{item.count} games</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-center text-sm text-gray-500 italic">
                      * Steam data last updated March 11, 2025
                    </p>
                  </>
                )}
              </motion.div>
            )}

            {/* Stats Tab */}
            {activeTab === 'stats' && (
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-medium mb-6">Gaming Statistics</h2>

                <div className="bg-white p-6 mb-8 border-l-4 border-primary">
                  <h3 className="font-medium mb-4">Lifetime Gaming Stats</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Total Games Played</p>
                      <p className="text-4xl font-light">400+</p>
                      <p className="text-xs text-gray-500">Across all platforms</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Total Playtime</p>
                      <p className="text-4xl font-light">7.600+</p>
                      <p className="text-xs text-gray-500">Hours (approximately)</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Account value</p>
                      <p className="text-4xl font-light">€3,000+</p>
                      <p className="text-xs text-gray-500">Based on current game prices</p>
                    </div>
                  </div>
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6">
                    <h3 className="font-medium mb-4">Platforms Owned</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Gamepad className="text-primary h-5 w-5" />
                        Xbox (Original)
                      </li>
                      <li className="flex items-center gap-2">
                        <Gamepad className="text-primary h-5 w-5" />
                        Xbox 360
                      </li>
                      <li className="flex items-center gap-2">
                        <Gamepad className="text-primary h-5 w-5" />
                        PlayStation 2
                      </li>
                      <li className="flex items-center gap-2">
                        <Gamepad className="text-primary h-5 w-5" />
                        Nintendo DS
                      </li>
                      <li className="flex items-center gap-2">
                        <Gamepad className="text-primary h-5 w-5" />
                        PC (Windows)
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6">
                    <h3 className="font-medium mb-4">Achievements</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm">Total Steam Achievements</p>
                        <div className="w-full bg-gray-200 h-4 mt-1">
                          <div className="bg-primary h-4" style={{ width: '68%' }}></div>
                        </div>
                        <p className="text-right text-xs text-gray-500">3,241 / 4,782</p>
                      </div>

                      <div>
                        <p className="text-sm">Xbox Gamerscore</p>
                        <div className="w-full bg-gray-200 h-4 mt-1">
                          <div className="bg-green-500 h-4" style={{ width: '72%' }}></div>
                        </div>
                        <p className="text-right text-xs text-gray-500">43,500 G</p>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="bg-white p-6border-primary mt-8">
                  <h2 className="text-2xl font-medium mb-6">Gaming Timeline</h2>

                  <div className="space-y-6">
                    <div className="relative pl-6 border-l-2 border-primary">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <p className="font-medium">2002</p>
                      <p>First console: PlayStation 1</p>
                      <p>First game: Spyro 2</p>
                    </div>

                    <div className="relative pl-6 border-l-2 border-primary">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <p className="font-medium">2004</p>
                      <p>Discovered Halo 2 and GTA San Andreas</p>
                    </div>

                    <div className="relative pl-6 border-l-2 border-primary">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <p className="font-medium">2010</p>
                      <p>Bought Xbox 360, started playing online COD MW2 and Halo 3</p>
                    </div>

                    <div className="relative pl-6 border-l-2 border-primary">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <p className="font-medium">2012</p>
                      <p>Started playing on PC, MTA San Andreas and Team Fortress 2</p>
                    </div>

                    <div className="relative pl-6 border-l-2 border-primary">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <p className="font-medium">2015</p>
                      <p>First 1000+ hours in a single game (Counter-Strike)</p>
                    </div>

                    <div className="relative pl-6 border-l-2 border-primary">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <p className="font-medium">2021</p>
                      <p>Tiktok account with 120k followers, minecraft content (i don't do that anymore)</p>
                    </div>

                    <div className="relative pl-6 border-l-2 border-primary">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <p className="font-medium">2025</p>
                      <p>Gaming less, but still enjoying it</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-white p-6 border-l-4 border-primary">
                  <h3 className="font-medium mb-4">Backlog Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm mb-2">Unplayed Games</p>
                      <div className="flex items-end">
                        <div className="text-3xl font-light">317</div>
                        <p className="text-xs text-gray-500 ml-2 mb-1">games (45.5% of library)</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">I'll get to them someday... probably</p>
                    </div>

                    <div>
                      <p className="text-sm mb-2">Games Under 2 Hours</p>
                      <div className="flex items-end">
                        <div className="text-3xl font-light">195</div>
                        <p className="text-xs text-gray-500 ml-2 mb-1">games (28% of library)</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">The "tried it once" collection</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* RetroAchievement Tab */}

            {/* RetroAchievements Tab - Simpler Version */}
            {activeTab === 'retro' && (
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-medium">RetroAchievements</h2>
                  <a
                    href="https://retroachievements.org/user/jaiki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary text-white font-medium text-sm rounded hover:bg-opacity-90 transition-colors flex items-center gap-2"
                  >
                    <Trophy className="h-4 w-4" />
                    My RetroAchievements Profile
                  </a>
                </div>

                <div className="bg-white px-6 border-l-4 border-primary mb-6">
                  <p className="text-lg font-light mb-4">
                    I'm honestly too tired and lazy to create a fancy section for this page like the others.
                    But I still love my retro games too much not to mention them here.
                  </p>
                  <p className="text-gray-700">
                    RetroAchievements lets me replay all the games from my childhood with the added bonus of
                    achievements. It's like making the nostalgia even more addictive.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-6">
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <Award className="text-primary" />
                      Favorite Retro Games
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span>Scarface: The World is Yours</span>
                        <span className="text-sm text-gray-500">PS2</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>The Sims 2</span>
                        <span className="text-sm text-gray-500">PSP</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Tombi 2</span>
                        <span className="text-sm text-gray-500">PS1</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Crash Bandicoot 2</span>
                        <span className="text-sm text-gray-500">PS1</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Spyro 3</span>
                        <span className="text-sm text-gray-500">PS1</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6">
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <Gamepad className="text-primary" />
                      RetroAchievements Stats
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm mb-1">Total Games Played</p>
                        <p className="text-2xl font-light">see my profile :D</p>
                      </div>
                      <div>
                        <p className="text-sm mb-1">Achievements Earned</p>
                        <p className="text-2xl font-light">see my profile :D</p>
                      </div>
                      <div>
                        <p className="text-sm mb-1">Mastered Games</p>
                        <p className="text-2xl font-light">see my profile :D</p>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="text-center text-sm text-gray-500 italic mt-6">
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>

      {/* Footer stats */}
      <motion.div
        variants={itemVariants}
        className="pl-8 text-xs text-gray-500 italic mt-8"
      >
        * If I had spent all my gaming hours learning a new skill instead, I could probably speak 8 languages or be a doctor by now. No regrets.<br />
        ** I have 696 Steam games but somehow always end up playing 25-year-old PS1 games instead, i'm getting ooooollllddd.
      </motion.div>
    </motion.div>
  );
};

export default Games;