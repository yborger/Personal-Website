import React from 'react';
import Image from 'next/image';
import styles from './portfolio.module.css';

interface Project {
  title: string;
  image: string;
  description: string;
}

const PortfolioItem: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className={styles.projectCard}> 
      {/* The full "Card" is the project image + title + description */}
      <input type="checkbox" id={`toggle-${project.title}`} className={styles.toggleCheckbox} />

      <label htmlFor={`toggle-${project.title}`} className={styles.imageContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className={styles.projectImage}
          />
          <div className={styles.overlay}>
            <h3>{project.title}</h3>
          </div>
        </div>
      </label>

      <div className={styles.overlayBox}>
        <h3>{project.title}</h3>
        
        <p>{project.description}</p>

        <label htmlFor={`toggle-${project.title}`} className={styles.closeButton}>Close</label>

      </div>
    </div>
  );
};

export default PortfolioItem;
