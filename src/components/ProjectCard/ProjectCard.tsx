import React from 'react';

export type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags }) => {
  return (
    <div className="border rounded-lg p-6 shadow-sm bg-card">
      <h3 className="text-xl font-semibold mb-2 text-card-foreground">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
