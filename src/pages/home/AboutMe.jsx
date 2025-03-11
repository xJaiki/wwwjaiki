import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Gamepad, Car, Code, Moon } from 'lucide-react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const AboutMe = () => {
    const cld = new Cloudinary({ cloud: { cloudName: 'dnjclqtlc' } });

    const img = cld
        .image('xukeq2drhyfxy0zvnhd4')
        .resize(auto(400))
        .toURL();
    const [leftPosition, setLeftPosition] = useState(0);
    const [showYaris, setShowYaris] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const aboutMeRef = useRef(null);

    // Calculate age automatically
    const calculateAge = () => {
        const today = new Date();
        const birthYear = 1999;
        let age = today.getFullYear() - birthYear;

        const hasHadBirthdayThisYear = today.getMonth() >= 3;
        if (!hasHadBirthdayThisYear) {
            age--;
        }

        return age;
    };

    const age = calculateAge();

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

    // Calculate the distance from left edge
    useEffect(() => {
        const calculateLeftPosition = () => {
            if (aboutMeRef.current) {
                const rect = aboutMeRef.current.getBoundingClientRect();
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
            className="about-me-page max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            ref={aboutMeRef}
        >
            <motion.div
                className="relative mb-2 inline-block"
                variants={itemVariants}
            >
                <h1 className="text-6xl md:text-7xl font-light text-primary">
                    About Me
                </h1>
            </motion.div>

            <div className="relative">
                {/* Red bar */}
                <div
                    className="absolute top-0 bottom-0 w-1 md:w-2 bg-primary"
                    style={{
                        left: `${leftPosition}px`
                    }}
                />

                {/* Intro text */}
                <motion.div variants={itemVariants} className="mb-4">
                    <p className="text-2xl font-light">
                        I'm Mario, 
                        <span
                            className="relative inline-block"
                            onMouseEnter={() => setTooltipVisible(true)}
                            onMouseLeave={() => setTooltipVisible(false)}
                        >
                            <span className="border-b border-dashed border-primary cursor-help"> {age} years old</span>
                            {tooltipVisible && (
                                <span className="absolute left-0 top-full mt-1 w-60 px-3 py-2 bg-white shadow-lg text-sm z-10 border-l-2 border-primary">
                                    Yes, this number updates automatically with a script. I'm not manually updating my age every year like some caveman.
                                </span>
                            )}
                        </span>
                    </p>
                </motion.div>

                {/* Developer section */}
                <motion.div variants={itemVariants} className="mb-4">
                    <div className="flex items-start gap-3 mb-4">
                        <Code className="text-primary mt-1 flex-shrink-0" />
                        <p className="text-lg font-light">
                            In my free time I develop stuff, and when I'm working I also develop stuff. The only time I'm not
                            coding is when I'm sleeping (actually, I'm kidding, it happens when I sleep too, someone please help me).
                        </p>
                    </div>
                </motion.div>

                {/* Gaming section */}
                <motion.div variants={itemVariants} className="mb-4">
                    <div className="flex items-start gap-3 mb-4">
                        <Gamepad className="text-primary mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-lg font-light mb-4">
                                I love video games, as long as they involve shooting or cars, I'm happy. I don't like games
                                where you have to follow too much of a story or anything else (I hate tutorials).
                            </p>

                            <div className="bg-white px-4 border-l-4 border-primary">
                                <h3 className="font-medium mb-2">My favorite games:</h3>
                                <ul className="list-disc list-inside space-y-1 font-light">
                                    <li>The Halo saga</li>
                                    <li>GTA San Andreas</li>
                                    <li>Need for Speed Underground 2</li>
                                    <li>Need for Speed Most Wanted</li>
                                    <li>Need for Speed Carbon</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Cars section with interactive element */}
                <motion.div variants={itemVariants} className="mb-8">
                    <div className="flex items-start gap-3">
                        <Car className="text-primary mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-lg font-light mb-4">
                                I love Japanese cars and my Toyota
                                <span
                                    className="mx-1 font-medium cursor-pointer underline decoration-dashed decoration-primary"
                                    onClick={() => setShowYaris(!showYaris)}
                                >
                                    {showYaris ? "Yaris" : "Celica"}
                                </span>.
                            </p>

                            {showYaris && (
                                <div className="bg-white p-4 border-l-4 border-primary mb-4 relative">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full md:w-1/3">
                                            <img
                                                src={img}
                                                alt="Toyota Yaris"
                                                className="w-full h-auto"
                                            />
                                        </div>
                                        <div className="w-full md:w-2/3">
                                            <p className="font-light">
                                                Yes, for now it's still a Yaris, but one day it will be a Celica.
                                                Everyone needs dreams, right?
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2 italic">Click on "Yaris" again to hide this</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
                
            </div>

            {/* Footer note */}
            <motion.p
                variants={itemVariants}
                className="text-xs text-gray-400 mt-8 italic"
            >
                * Any resemblance to an actual functioning human is purely coincidental
            </motion.p>
        </motion.div>
    );
};

export default AboutMe;