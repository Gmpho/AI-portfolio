import React from 'react';
import { ProjectCard } from '../ProjectCard';
import { Project } from '@/types/project.d'; // Import Project type

const projects: Project[] = [
  {
    id: '1',
    title: 'AI Resume Analyzer',
    description: 'Upload a PDF resume and receive improvement suggestions.',
    technologies: ['TypeScript', 'pdf.js', 'regex'],
    category: 'AI/ML',
    status: 'completed',
    featured: true,
    // githubUrl: 'https://github.com/your-repo/ai-resume-analyzer',
    // liveUrl: 'https://your-live-demo.com/ai-resume-analyzer',
    // imageUrl: '/images/ai-resume-analyzer.png',
  },
  {
    id: '2',
    title: 'AI-Powered Portfolio',
    description: 'A portfolio website with a TypeScript-powered chatbot.',
    technologies: ['TypeScript', 'OpenAI API', 'Next.js'],
    category: 'Web Development',
    status: 'wip',
    featured: true,
    // githubUrl: 'https://github.com/your-repo/ai-powered-portfolio',
    // liveUrl: 'https://your-live-demo.com/ai-powered-portfolio',
    // imageUrl: '/images/ai-powered-portfolio.png',
  },
  // Add more projects here
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
