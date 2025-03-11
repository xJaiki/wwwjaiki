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
      id: 7,
      title: "Advanced Production Line Management System",
      description: "Updated an evolutionary system for managing a new production line through sophisticated file processing and real-time data visualization to streamline manufacturing operations.",
      technologies: ["ASP.NET MVC", "C#", "MSSQL", "JavaScript", "Bootstrap"],
      image: null,
      details: [
        "Engineered robust parsing algorithms to process and transform complex high-volume data files into actionable insights",
        "Developed normalized database schema optimized for production line metrics and operational analytics",
        "Implemented responsive user interface with real-time updates to monitor production line advancement",
        "Created comprehensive data validation protocols ensuring manufacturing process integrity and quality control"
      ]
    },
    {
      id: 8,
      title: "Comprehensive Marina Management Platform",
      description: "Independently designed, developed, and deployed a full-featured marina reservation and management system with integrated payment processing, developed using Spring, MySQL, React, and Tailwind CSS.",
      technologies: ["Spring Boot", "MySQL", "React", "Tailwind CSS", "PagoPA", "Debian"],
      image: null,
      details: [
        "Orchestrated the entire software development lifecycle from requirements gathering to production deployment on Debian servers",
        "Implemented secure company registration and complex reservation workflows with business rule validations",
        "Integrated PagoPA payment gateway enabling seamless transaction processing for reservations",
        "Engineered comprehensive vehicle and document management systems with secure document storage",
        "Executed all aspects of the project autonomously, including system architecture, development, testing, and deployment"
      ]
    },
    {
      id: 1,
      title: "Enterprise Personnel Management System",
      description: "Spearheaded the architecture and development of a comprehensive web application for personnel management, user profiles, and advanced cross-referencing analytics for executive reporting.",
      technologies: ["C#", ".NET", "Angular", "Keycloak", "Docker", "MSSQL"],
      image: "", // Can add image URL later if available
      details: [
        "Engineered an intuitive user interface optimized for high-volume personnel data management",
        "Implemented enterprise-grade authentication protocols leveraging Keycloak for seamless SSO integration",
        "Architected sophisticated reporting frameworks enabling data-driven decision making for leadership",
        "Orchestrated containerization strategy using Docker to ensure consistent deployment across environments"
      ]
    },
    {
      id: 2,
      title: "Advanced Industrial Process Management Solutions",
      description: "Designed and engineered cutting-edge software solutions using ASP.NET Core and WPF for industrial process orchestration and real-time data synchronization across manufacturing environments.",
      technologies: ["C#", ".NET", "ASP.NET Core", "MSSQL", "WPF", "WebSocket", "SignalR"],
      image: null,
      details: [
        "Developed high-performance desktop applications using WPF for mission-critical industrial process control",
        "Engineered scalable RESTful APIs facilitating seamless integration with enterprise business systems",
        "Implemented fault-tolerant real-time communication infrastructure utilizing WebSocket and SignalR",
        "Optimized database query performance for high-throughput industrial data processing environments"
      ]
    },
    {
      id: 3,
      title: "Enterprise Attendance Management Platform",
      description: "Architected and delivered a sophisticated web application for attendance tracking with comprehensive administrative controls and automated Excel report generation capabilities.",
      technologies: ["ASP.NET Core", "C#", "MSSQL", "Figma"],
      image: null,
      details: [
        "Collaborated with design team to create intuitive user interfaces through iterative Figma prototyping",
        "Engineered robust backend architecture for efficient attendance data processing and storage",
        "Developed comprehensive reporting engine with automated Excel export functionality",
        "Implemented granular role-based access control system for secure administrative operations"
      ]
    },
    {
      id: 4,
      title: "Enterprise B2C E-commerce Platform - Technology Sector",
      description: "Engineered checkout logic optimization and led platform maintenance initiatives for a global technology company's enterprise e-commerce solution.",
      technologies: ["Java", "SAP Commerce Cloud (Hybris)"],
      image: null,
      details: [
        "Redesigned checkout workflow resulting in significant conversion rate improvements",
        "Executed platform maintenance and version upgrade strategies for SAP Commerce Cloud",
        "Implemented innovative UX enhancements based on customer journey analytics",
        "Collaborated with cross-functional international teams to orchestrate feature deployment"
      ]
    },
    {
      id: 5,
      title: "Global B2C E-commerce Solution - Home Appliance Sector",
      description: "Led the integration of next-generation payment methods (Apple Pay and PayPal) for a high-volume global e-commerce platform.",
      technologies: ["Java", "SAP Commerce Cloud (Hybris)", "Adyen", "Braintree"],
      image: null,
      details: [
        "Architected seamless integration between SAP Commerce Cloud and enterprise payment gateways including Adyen and Braintree",
        "Implemented secure Apple Pay and PayPal API integrations to expand payment ecosystem",
        "Engineered robust transaction validation and verification systems ensuring financial integrity",
        "Conducted comprehensive security testing to ensure PCI DSS compliance across all payment channels"
      ]
    },
    {
      id: 6,
      title: "3EM Corporate Website",
      description: "Engineered a high-performance corporate website utilizing Preact and Tailwind CSS to deliver exceptional user experience with industry-leading performance metrics.",
      technologies: ["Preact", "Tailwind CSS"],
      image: null,
      details: [
        "Developed a highly responsive corporate web presence optimized for multi-device accessibility",
        "Leveraged Preact's virtual DOM implementation to achieve exceptional performance benchmarks",
        "Implemented sophisticated animation sequences to enhance user engagement metrics",
        "Executed comprehensive SEO strategy resulting in significant improvement in search visibility"
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
        Work Projects
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
              Professional projects I've worked on throughout my career. Each project required specific technical skills and contributed to my professional growth.
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
                        Professional
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
        * For confidentiality reasons, some project details have been omitted or generalized.<br/>
        ** Also have you seen how serious I look in this page? So professional!
      </motion.div>
    </motion.div>
  );
};

export default PersonalProjects;