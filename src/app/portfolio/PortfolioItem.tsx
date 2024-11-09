import React, { useState } from 'react';
import styles from './portfolio.module.css';

interface Project {
  title: string;
  images: string[];
  description: string;
}

const PortfolioItem: React.FC<{ project: Project }> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleExpand = () => setIsExpanded(!isExpanded);

  //MULTI-IMAGE PROJECTS
  const nextImage = () => setCurrentImageIndex((currentImageIndex + 1) % project.images.length);
  const prevImage = () => setCurrentImageIndex((currentImageIndex - 1 + project.images.length) % project.images.length);

  return (
    <div className={styles.projectCard}>
      <div className={styles.imageContainer} onClick={handleExpand}>
        <img src={project.images[0]} alt={project.title} className={styles.projectImage} />
        <div className={styles.overlay}>
          <h3>{project.title}</h3>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.expandedOverlay} onClick={handleExpand}>
          <div className={styles.expandedContent}>
            <img src={project.images[currentImageIndex]} alt={project.title} />
            <div className={styles.description}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={styles.controls}>
                <button onClick={prevImage}>Previous</button>
                <button onClick={nextImage}>Next</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioItem;
