import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, X, Battery, Gamepad, Coffee, Cpu } from 'lucide-react';

const CollectionsPage = () => {
  const [leftPosition, setLeftPosition] = useState(0);
  const [activeTab, setActiveTab] = useState('monsters');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCountry, setFilterCountry] = useState('All');
  const pageRef = useRef(null);

  // Data for all collections
  const monsterData = [
    {name: "Ultra Fiesta", country: "Italy", image: "https://i.imgur.com/eVO1AVl.jpg"},
    {name: "Ultra Blue", country: "Poland", image: "https://i.imgur.com/6vysZX2.jpg"},
    {name: "Ultra Violet", country: "Poland", image: "https://i.imgur.com/tPS76Rr.jpg"},
    {name: "Mixxd", country: "Spain", image: "https://i.imgur.com/nYNvXUS.jpg"},
    {name: "Ultra Pipeline", country: "Italy", image: "https://i.imgur.com/0TkqM7i.jpg"},
    {name: "Ultra Paradise", country: "Italy", image: "https://i.imgur.com/YfNoIWY.jpg"},
    {name: "Ultra Fiesta", country: "Poland", image: "https://i.imgur.com/uWhFUwl.jpg"},
    {name: "Ultra Citron", country: "Italy", image: "https://i.imgur.com/qPqZGdI.jpg"},
    {name: "Ripper", country: "Poland", image: "https://i.imgur.com/FuwqzRV.jpg"},
    {name: "Pacific", country: "U.S.A.", image: "https://i.imgur.com/9vSoiqe.jpg"},
    {name: "Pacific", country: "Italy", image: "https://i.imgur.com/8BQRDlM.jpg"},
    {name: "Ultra Red", country: "Italy", image: "https://i.imgur.com/Jocyplr.jpg"},
    {name: "Ultra White", country: "Russia", image: "https://i.imgur.com/mCMhPnA.jpg"},
    {name: "Mean Bean", country: "U.S.A.", image: "https://i.imgur.com/Cd5xNLu.jpg"},
    {name: "Loca Moca", country: "U.S.A.", image: "https://i.imgur.com/tGZFXFm.jpg"},
    {name: "Pacific", country: "Poland", image: "https://i.imgur.com/EPgWtjB.jpg"},
    {name: "Ultra Sunrise", country: "Russia", image: "https://i.imgur.com/bdVr2re.jpg"},
    {name: "Mango Loco", country: "Poland", image: "https://i.imgur.com/rNpxgWE.jpg"},
    {name: "Ultra Fiesta", country: "Italy", image: "https://i.imgur.com/xYSamLx.jpg"},
    {name: "Ultra White", country: "Italy", image: "https://i.imgur.com/Wto4aEc.jpg"},
    {name: "Ultra Blue", country: "U.S.A.", image: "https://i.imgur.com/ZuUSZRv.jpg"},
    {name: "Lewis Hamilton 3 ★", country: "Italy", image: "https://i.imgur.com/esdqZ8H.jpg"},
    {name: "Mango Loco", country: "Italy", image: "https://i.imgur.com/9hl8a2d.jpg"},
    {name: "Mixxd", country: "Poland", image: "https://i.imgur.com/L4jcAMJ.jpg"},
    {name: "Ultra Watermelon", country: "Italy", image: "https://i.imgur.com/R89noH4.jpg"},
    {name: "The Doctor VR46", country: "Italy", image: "https://i.imgur.com/3CLfgXw.jpg"},
    {name: "Dragon Tea White", country: "U.S.A.", image: "https://i.imgur.com/OYzOnFG.jpg"},
    {name: "Absolutely Zero", country: "Italy", image: "https://i.imgur.com/ObQ2Qkz.jpg"},
    {name: "Absolutely Zero", country: "Italy", image: "https://i.imgur.com/QH6n7uw.jpg"},
    {name: "Monarch", country: "Poland", image: "https://i.imgur.com/EKO3F6G.jpg"},
    {name: "Ultra Black", country: "U.K.", image: "https://i.imgur.com/UW2Or1i.jpg"},
    {name: "Assault", country: "Italy", image: "https://i.imgur.com/YFweEYp.jpg"},
    {name: "Rehab Lemon", country: "Italy", image: "https://i.imgur.com/YFweEYp.jpg"},
    {name: "Khaos", country: "Italy", image: "https://i.imgur.com/Dsm9Efm.jpg"},
    {name: "Ripper", country: "Italy", image: "https://i.imgur.com/mWBRk1E.jpg"},
    {name: "Mule", country: "Poland", image: "https://i.imgur.com/BmqEF8W.jpg"},
    {name: "Irish Blend", country: "U.S.A.", image: "https://i.imgur.com/dw2bsvb.jpg"},
    {name: "Classic", country: "Russia", image: "https://i.imgur.com/YrEY3Vn.jpg"},
    {name: "Nitro", country: "Italy", image: "https://i.imgur.com/mQRDkkQ.jpg"},
    {name: "Classic", country: "Poland", image: "https://i.imgur.com/xJnIZdP.jpg"},
    {name: "Ultra Blue", country: "Greece", image: "https://i.imgur.com/EI2Hs0N.jpg"},
    {name: "Absolutely Zero", country: "U.S.A.", image: "https://i.imgur.com/xthmg8I.jpg"},
    {name: "Monarch", country: "Netherland", image: "https://i.imgur.com/C9qd3ew.jpg"},
    {name: "Ultra Gold", country: "U.S.A.", image: "https://i.imgur.com/qrFsc5S.jpg"},
    {name: "Nitro", country: "U.K.", image: "https://i.imgur.com/iyHEDTV.jpg"},
    {name: "Ripper", country: "Italy", image: "https://i.imgur.com/WE37kkZ.jpg"},
    {name: "COD: Infinity Warfare", country: "Italy", image: "https://i.imgur.com/9WgDODK.jpg"},
    {name: "Apex Legend", country: "Italy", image: "https://i.imgur.com/zx1r41Z.jpg"},
    {name: "COD: Black Ops 4", country: "Italy", image: "https://i.imgur.com/3dwLCqV.jpg"},
    {name: "Halo Infinite", country: "Italy", image: "https://i.imgur.com/aqoRU6H.jpg"},
    {name: "AC: Origins", country: "Italy", image: "https://i.imgur.com/s2vQOMg.jpg"}
  ];

  const decksData = [
    {
      name: "Nuriel, la Devota del Cielo Velenoso",
      image: "https://i.imgur.com/0naDXI2.jpg",
      sas: "73",
      cas1: "https://i.imgur.com/HfPVGaB.png",
      cas2: "https://i.imgur.com/4DQ1wqm.png",
      cas3: "https://i.imgur.com/Ny2muZj.png",
      url: "https://decksofkeyforge.com/decks/58a6cc12-8202-465b-ab51-efd0d525e127",
      exp: "Dark Tidings",
    },
    {
      name: "Dioniso \"Arlecchino\" l'Alto",
      image: "https://i.imgur.com/XBJgcH2.jpg",
      sas: "68",
      cas1: "https://i.imgur.com/HfPVGaB.png",
      cas2: "https://i.imgur.com/0nnetOv.png",
      cas3: "https://i.imgur.com/4DQ1wqm.png",
      url: "https://decksofkeyforge.com/decks/79e7ecaf-6ae7-4c91-8575-41187f0460b3",
      exp: "Worlds Collide",
    },
    {
      name: "C. T. Che Insegna l'Assurdità della Stella",
      image: "https://i.imgur.com/JtERgpj.jpg",
      sas: "61",
      cas1: "https://i.imgur.com/cuyMCRb.png",
      cas2: "https://i.imgur.com/zy1alb0.png",
      cas3: "https://i.imgur.com/0nnetOv.png",
      url: "https://decksofkeyforge.com/decks/dc67a878-6133-43ef-ba7d-dc5736d64e64",
      exp: "Worlds Collide",
    },
    {
      name: "Z. C. Che Fugge con la Bizzarria della Piana",
      image: "https://i.imgur.com/8opAHgL.jpg",
      sas: "59",
      cas1: "https://i.imgur.com/cuyMCRb.png",
      cas2: "https://i.imgur.com/4DQ1wqm.png",
      cas3: "https://i.imgur.com/0nnetOv.png",
      url: "https://decksofkeyforge.com/decks/520c5195-ae7d-43db-ae80-e455e839c582",
      exp: "Mass Mutation",
    }
  ];

  const gearData = [
    {
      name: "AKG K52",
      image: "https://i.imgur.com/mAUoZHr.jpg",
      desc: "Budget headphones that don't sound budget. Great for late-night gaming sessions without waking up the neighbors."
    },
    {
      name: "PowerA Moga XP5-X Plus",
      image: "https://i.imgur.com/L0SFnnC.jpg",
      desc: "My go-to controller for mobile gaming. Makes shooting n00bs on the go much easier than touchscreen controls."
    },
    {
      name: "Oculus Rift",
      image: "https://i.imgur.com/ryHhdFj.jpg",
      desc: "My portal to other worlds where I can pretend I have better coordination than I actually do."
    },
    {
      name: "Neewer Nw-800",
      image: "https://i.imgur.com/sWPoCHZ.jpg",
      desc: "Makes me sound 20% more intelligent in Discord calls. Results may vary."
    },
    {
      name: "Xiaomi Earbuds lite 2",
      image: "https://i.imgur.com/C5QcOhZ.jpg",
      desc: "Perfect for ignoring people in public while listening to game soundtracks on repeat."
    },
    {
      name: "ACGam AG-109R",
      image: "https://i.imgur.com/Ux0WjH4.jpg",
      desc: "My keyboard. The RGB makes me at least 43% better at gaming. It's science."
    },
    {
      name: "DDR dance pad",
      image: "https://i.imgur.com/zfmA49G.jpg",
      desc: "The only exercise equipment I own. Used approximately twice a year when I feel ambitious."
    },
  ];

  const consoleData = [
    {
      name: "Xbox",
      status: "modded",
      desc: "I was that weird guy in italian elementary school with Xbox and not the PS2, but god i love this machine, it is for sure my favourite. With this Xbox i got introduced to my favourite videogame saga Halo!",
      image: "https://i.imgur.com/JA7Ohmw.jpg"
    },
    {
      name: "Xbox 360",
      status: "modded",
      desc: "I got the Xbox 360 with kinect for i don't remember which Christmass. I wanted so bad this console only to play Halo 3 and 'finishing the fight!'. Then in the 2021 i got bored and modded it",
      image: "https://i.imgur.com/9QSOqAG.jpg"
    },
    {
      name: "Play Station 1",
      status: "modded",
      desc: "This is a funny story, my very first console was a PS2, 1 week and it broke up so my parents got me a PS1, and thank god i didn't skip the PS1 or i'd lost some masterpiece like Crash Bandicoot and Spyro!",
      image: "https://i.imgur.com/VWuvOqo.jpg"
    },
    {
      name: "Play Station 2 slim",
      status: "modded",
      desc: "As mentioned in the PS1 this was my very first console, but i never enjoyed it in its golden era, i got my 'very first' PS2 in 2020, already modded",
      image: "https://i.imgur.com/zT6p7Dy.jpg"
    },
    {
      name: "Play Station 3 fat",
      status: "broken",
      desc: "One of my dad's friend gave him this broken PS3 with the hope to fix it, well never fixed it, but now i have a nice Sony paperweight",
      image: "https://i.imgur.com/lDK2JPQ.jpg"
    },
    {
      name: "Play Station 4 slim",
      status: "modded",
      desc: "Got this PS4 this year for very very very very cheap, got bored and modded it",
      image: "https://i.imgur.com/bO7f8Oe.jpg"
    },
    {
      name: "PSP 1000",
      status: "modded",
      desc: "Sony please make a new PSP we need it. One of my favourite console ever made, very powerful and super portable, we really need a new iteration of the PSP",
      image: "https://i.imgur.com/c9M7HAr.jpg"
    },
    {
      name: "Nintendo DS",
      status: "modded",
      desc: "I'm not really a Nintendo fan in fact i only have this DS because a friend of mine bought the 3DS so he gave me it. Nothing much to say, it has one of the top screen pin broken and (obiouvsly) no stylo",
      image: "https://i.imgur.com/vJ1d5ui.jpg"
    },
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

  // Get unique countries for filter
  const countries = ['All', ...new Set(monsterData.map(item => item.country))];

  // Filter monsters based on country
  const filteredMonsters = filterCountry === 'All' 
    ? monsterData 
    : monsterData.filter(item => item.country === filterCountry);

  // Handle item click to show modal
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Tabs config
  const tabs = [
    { id: 'monsters', label: 'Monster Energy', icon: <Coffee /> },
    { id: 'decks', label: 'KeyForge Decks', icon: <Gamepad /> },
    { id: 'gear', label: 'Tech Gear', icon: <Cpu /> },
    { id: 'consoles', label: 'Console Collection', icon: <Gamepad /> }
  ];

  return (
    <motion.div
      className="collections-page max-w-6xl mx-auto"
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
            className="text-6xl font-light text-primary mb-6"
            variants={itemVariants}
          >
            Collections
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl font-light mb-8">
            A place to showcase all the useless stuff I spend my money on.
          </motion.p>

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
            {/* Monster Energy Collection */}
            {activeTab === 'monsters' && (
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-medium">Monster Energy Collection <span className="text-sm text-gray-500">- Last updated 2022 </span></h2>
                  <p className="text-lg">Total: {filteredMonsters.length} cans</p>
                </div>
                
                {/* Country filter */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {countries.map(country => (
                    <button
                      key={country}
                      className={`px-3 py-1 text-sm ${
                        filterCountry === country
                          ? 'bg-primary text-white'
                          : 'bg-white border border-gray-200 hover:border-primary'
                      }`}
                      onClick={() => setFilterCountry(country)}
                    >
                      {country}
                    </button>
                  ))}
                </div>
                
                {/* Heart rate warning banner */}
                <div className="bg-white px-4 border-l-4 border-primary mb-6 flex items-center gap-3">
                  <Battery className="text-red-500 animate-pulse" />
                  <div>
                    <p className="font-medium">Heart Status Warning</p>
                    <p className="text-sm">My cardiologist strongly advises against viewing this collection. Proceed at your own risk.</p>
                  </div>
                </div>
                
                {/* Monster grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredMonsters.map((monster, index) => (
                    <motion.div
                      key={`${monster.name}-${index}`}
                      className="bg-white p-2 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleItemClick(monster)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={monster.image}
                          alt={monster.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium truncate">{monster.name}</p>
                        <p className="text-xs text-gray-500">{monster.country}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* KeyForge Decks */}
            {activeTab === 'decks' && (
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-medium">KeyForge Deck Collection</h2>
                  <p className="text-lg">Total: {decksData.length} decks</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {decksData.map((deck, index) => (
                    <motion.div
                      key={index}
                      className="bg-white px-4 border-l-4 border-primary hover:shadow-md transition-shadow"
                      onClick={() => handleItemClick(deck)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/3">
                          <div className="aspect-[2/3] overflow-hidden">
                            <img
                              src={deck.image}
                              alt={deck.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="w-full md:w-2/3">
                          <h3 className="text-lg font-medium mb-2">{deck.name}</h3>
                          <p className="text-sm mb-2">Expansion: {deck.exp}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">SAS:</span>
                            <div className="w-full max-w-[100px] bg-gray-200 h-3">
                              <div
                                className="h-3 bg-primary"
                                style={{ width: `${(parseInt(deck.sas) / 100) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{deck.sas}</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <img src={deck.cas1} alt="House" className="h-6" />
                            <img src={deck.cas2} alt="House" className="h-6" />
                            <img src={deck.cas3} alt="House" className="h-6" />
                          </div>
                          <a
                            href={deck.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline mt-2 inline-block"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View on DoK
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tech Gear */}
            {activeTab === 'gear' && (
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-medium">Tech Gear <span className="text-sm text-gray-500">- Last updated 2022</span></h2>
                  <p className="text-lg">Total: {gearData.length} items</p>
                </div>
                
                <div className="bg-white px-4 border-l-4 border-primary mb-6">
                  <p className="font-medium mb-1">Gear Disclaimer</p>
                  <p className="text-sm">I have not cleaned any of these items since purchase. They contain enough DNA samples to clone me.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gearData.map((gear, index) => (
                    <motion.div
                      key={index}
                      className="flex bg-white hover:shadow-md transition-shadow overflow-hidden"
                      whileHover={{ y: -5 }}
                    >
                      <div className="w-1/3 overflow-hidden">
                        <img
                          src={gear.image}
                          alt={gear.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <h3 className="text-lg font-medium mb-1">{gear.name}</h3>
                        <p className="text-sm">{gear.desc || "No description available. I was probably too busy using it to write something."}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Console Collection */}
            {activeTab === 'consoles' && (
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-medium">Console Collection <span className="text-sm text-gray-500">- Last updated 2022</span></h2>
                  <p className="text-lg">Total: {consoleData.length} consoles</p>
                </div>
                
                <div className="bg-white px-4 border-l-4 border-primary mb-6">
                  <p className="font-medium mb-1">Warning: Modding Addiction</p>
                  <p className="text-sm">If it has a CPU, I will find a way to soft mod it, because I'm not good with a soldering iron.</p>
                </div>
                
                <div className="space-y-6">
                  {consoleData.map((console, index) => (
                    <motion.div
                      key={index}
                      className="bg-white hover:shadow-md transition-shadow overflow-hidden"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 overflow-hidden">
                          <img
                            src={console.image}
                            alt={console.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-full md:w-2/3 p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">{console.name}</h3>
                            <span className={`px-2 py-1 text-xs ${
                              console.status === 'modded' ? 'bg-green-100 text-green-800' :
                              console.status === 'broken' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {console.status}
                            </span>
                          </div>
                          <p className="text-sm">{console.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
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
        * Total money spent on these collections: Enough to make my bank account cry
      </motion.div>

      {/* Modal for item details */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-xl font-medium">{selectedItem.name}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
            </div>
            <div className="p-4">
              <div className="flex flex-col items-center mb-4">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="max-h-[50vh] object-contain mb-4"
                />
                {selectedItem.country && (
                  <p className="text-sm bg-gray-100 px-2 py-1">
                    Country: {selectedItem.country}
                  </p>
                )}
                {selectedItem.exp && (
                  <div className="w-full mt-2">
                    <p className="text-sm">Expansion: {selectedItem.exp}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-medium">SAS:</span>
                      <div className="w-full max-w-[200px] bg-gray-200 h-3">
                        <div
                          className="h-3 bg-primary"
                          style={{ width: `${(parseInt(selectedItem.sas) / 100) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{selectedItem.sas}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {selectedItem.cas1 && <img src={selectedItem.cas1} alt="House" className="h-8" />}
                      {selectedItem.cas2 && <img src={selectedItem.cas2} alt="House" className="h-8" />}
                      {selectedItem.cas3 && <img src={selectedItem.cas3} alt="House" className="h-8" />}
                    </div>
                  </div>
                )}
                {selectedItem.status && (
                  <div className="mt-2 w-full">
                    <p className="flex items-center gap-2">
                      Status: 
                      <span className={`px-2 py-1 text-xs ${
                        selectedItem.status === 'modded' ? 'bg-green-100 text-green-800' :
                        selectedItem.status === 'broken' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedItem.status}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <p>{selectedItem.desc}</p>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CollectionsPage;