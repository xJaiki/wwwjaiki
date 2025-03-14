import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code, Database, Globe, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const PersonalProjects = () => {
  const [leftPosition, setLeftPosition] = useState(0);
  const [expandedProject, setExpandedProject] = useState(null);
  const pageRef = useRef(null);

  // Professional projects data
  const workProjects = [
    {
      id: 1,
      title: "Orderly - Sales Order Management System",
      description: "Developed a comprehensive MVP solution in React designed to streamline and optimize the order creation workflow for sales agents, featuring a custom-built ORM for efficient data management and PDF export capabilities.",
      technologies: ["React", "Node.js", "JavaScript", "ORM", "PDF Generation"],
      image: null,
      details: [
        "Engineered intuitive user interface allowing sales agents to efficiently manage customers and products in a unified platform",
        "Implemented custom lightweight ORM solution for seamless data operations and relationship management",
        "Developed robust order creation workflow with multi-step validation to ensure data integrity",
        "Created PDF export functionality enabling professional document generation for client distribution and record-keeping"
      ]
    },
    {
      id: 2,
      title: "Faster than Green - Reaction Speed Game",
      description: "Created an engaging web-based reaction speed testing game that challenges users to click green buttons as quickly as possible, with Firebase integration for persistent score tracking and competitive leaderboards.",
      technologies: ["HTML", "CSS", "JavaScript", "Firebase", "Web Game Development"],
      image: null,
      details: [
        "Designed responsive game interface with intuitive controls optimized for quick reaction inputs",
        "Implemented precision timing mechanisms to accurately measure and evaluate user reaction speed",
        "Developed scoring algorithm with progressive difficulty scaling for engaging gameplay experience",
        "Integrated Firebase backend for real-time score tracking, leaderboards, and persistent user statistics"
      ]
    },
    {
      id: 3,
      title: "Soldini - Personal Finance Management Application",
      description: "Engineered an innovative personal finance MVP initially developed as a web application and later transformed into a cross-platform mobile solution using Capacitor, featuring an intuitive chat-like interface for expense and income tracking.",
      technologies: ["React", "Capacitor", "Node.js", "SQLite", "Mobile Development"],
      image: null,
      details: [
        "Developed conversational UI with chat-like interaction paradigm for intuitive financial data entry",
        "Implemented local SQLite database for secure offline storage of sensitive financial information",
        "Created comprehensive expense and income categorization system with analytical reporting capabilities",
        "Leveraged Capacitor framework to transform web application into fully-functional mobile experience"
      ]
    },
    {
      id: 4,
      title: "Youtubino - Video Download Management System",
      description: "Designed a sophisticated Electron-based graphical interface for yt-dlp that simplifies the video downloading process, complemented by a Telegram bot integration enabling remote download initiation and wireless file transfer capabilities.",
      technologies: ["Electron", "Node.js", "yt-dlp", "Telegram Bot API", "Desktop Application"],
      image: null,
      details: [
        "Engineered user-friendly desktop interface abstracting complex command-line operations into intuitive controls",
        "Implemented Telegram bot integration enabling remote download initiation from mobile devices",
        "Developed secure wireless file transfer protocol for seamless content distribution between devices",
        "Created robust download queue management system with priority controls and status monitoring"
      ]
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

  // Toggle project expansion
  const toggleProject = (projectId) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
    }
  };

  return (
    <motion.div
      className="work-projects-page max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      ref={pageRef}
    >
      <motion.h1
        className="text-6xl font-light text-primary mb-6 flex items-center gap-3"
        variants={itemVariants}
      >
        Personal Projects
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
              Some personal project I've worked on the free time. If you have some cool ideas, let me know!
            </motion.p>

            {/* Projects list */}
          <div className="space-y-6">
            {workProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-white shadow-sm"
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleProject(project.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="inline-block mb-2 px-2 py-1 bg-primary bg-opacity-10 text-white text-xs font-medium">
                        Personal
                      </div>
                      <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                      <p className="text-gray-700 mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index} 
                            className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      className="text-gray-500 hover:text-primary transition-colors"
                      aria-label={expandedProject === project.id ? "Nascondi dettagli" : "Mostra dettagli"}
                    >
                      {expandedProject === project.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Expanded content */}
                {expandedProject === project.id && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    {project.image && (
                      <div className="mb-4">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-auto rounded"
                        />
                      </div>
                    )}
                    
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Code className="text-primary h-5 w-5" />
                      Details
                    </h4>
                    
                    <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                      {project.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Database className="h-4 w-4 mr-1" />
                      <span>Tech stack: {project.technologies.join(', ')}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer note */}
      <motion.div
        variants={itemVariants}
        className="pl-8 text-xs text-gray-500 italic mt-8"
      >
      </motion.div>
    </motion.div>
  );
};

export default PersonalProjects;