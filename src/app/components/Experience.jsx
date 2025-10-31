'use client'
import { useState, useEffect, useRef } from 'react';

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  const experiences = [
    {
      company: "Kavelogics Technologies",
      position: "Frontend Developer Intern",
      period: "June 2023 - Present",
      description: "Working on modern web applications using React, Next.js, and TypeScript. Collaborating with the design team to implement responsive UI components.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma"]
    },
    {
      company: "Freelance Projects",
      position: "Frontend Developer",
      period: "January 2022 - May 2023",
      description: "Developed various web applications for clients, focusing on responsive design, performance optimization, and user experience.",
      technologies: ["JavaScript", "React", "Bootstrap", "Redux", "REST APIs"]
    },
    {
      company: "University Projects",
      position: "Student Developer",
      period: "September 2021 - December 2022",
      description: "Built academic projects including web applications, mobile apps, and participated in coding competitions.",
      technologies: ["HTML/CSS", "JavaScript", "React Native", "Python", "Git"]
    }
  ];

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3"] },
    { category: "Styling", items: ["Tailwind CSS", "Bootstrap", "Material-UI", "Styled Components"] },
    { category: "Tools", items: ["Git", "Figma", "VS Code", "Webpack", "Jest"] },
    { category: "Others", items: ["Redux", "REST APIs", "GraphQL", "Firebase", "MongoDB"] }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add experience items with delay
          experiences.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, `exp-${index}`]);
            }, index * 300);
          });
          
          // Add skill categories with delay
          skills.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, `skill-${index}`]);
            }, (index + experiences.length) * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 slide-in-down">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Experience & Skills</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            My professional journey and technical expertise in frontend development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience Timeline */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 slide-in-left">Work Experience</h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className={`
                    relative pl-8 transition-all duration-500
                    ${visibleItems.includes(`exp-${index}`) ? 'slide-in-left opacity-100' : 'opacity-0 -translate-x-10'}
                  `}
                >
                  <div className="absolute left-0 top-2 w-4 h-4 bg-blue-600 rounded-full bounce-slow"></div>
                  <div className="absolute left-2 top-2 w-0.5 h-full bg-gray-300"></div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition duration-300 transform hover:scale-105">
                    <h4 className="text-lg font-bold text-gray-900 shake">{exp.position}</h4>
                    <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                    <p className="text-gray-500 text-sm mb-4">{exp.period}</p>
                    <p className="text-gray-600 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full pulse-slow"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 slide-in-right">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skillGroup, index) => (
                <div 
                  key={index}
                  className={`
                    transition-all duration-500
                    ${visibleItems.includes(`skill-${index}`) ? 'slide-in-right opacity-100' : 'opacity-0 translate-x-10'}
                  `}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 shake">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-110 shake"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Design Skills */}
            <div className={`
              mt-8 transition-all duration-500
              ${visibleItems.includes(`skill-${skills.length}`) ? 'slide-in-up opacity-100' : 'opacity-0 translate-y-10'}
            `}>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 shake">Design Tools</h4>
              <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition duration-300 transform hover:scale-105">
                <p className="text-gray-600 mb-4">
                  Experienced in using Figma for UI/UX design, prototyping, and creating design systems. 
                  Comfortable with design collaboration and developer handoff processes.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg bounce-slow">Figma</span>
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg bounce-slow">Prototyping</span>
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg bounce-slow">Wireframing</span>
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg bounce-slow">Design Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;