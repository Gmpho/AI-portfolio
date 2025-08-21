import React from 'react';
import { ProjectCard } from '../ProjectCard';

const projects: ProjectCardProps[] = [
  {
    title: 'AI Resume Analyzer',
    description: 'Upload a PDF resume and receive improvement suggestions.',
    tags: ['TypeScript', 'pdf.js', 'regex'],
  },
  {
    title: 'AI-Powered Portfolio',
    description: 'A portfolio website with a TypeScript-powered chatbot.',
    tags: ['TypeScript', 'OpenAI API', 'Next.js'],
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
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
