import React from 'react';
import Image from 'next/image';
import Layout from '../layout';
import styles from './portfolio.module.css';

const projects = [
  { id: 1, title: "Music Recommendation App", description: "im putting random text for now wooooooo", image: "/portfolio_imgs/music-app_phone concept 1.jpg" },
  { id: 2, title: "Music Menu UI", description: "Description for Project 2", image: "/portfolio_imgs/music-menu ui basic pre-feedback.jpg" },
  { id: 3, title: "Project 3", description: "Description for Project 3", image: "/portfolio_imgs/project3.jpg" },
];

const Portfolio: React.FC = () => {
  return (
    <Layout>
      <section className="text-spacing">
        <div className="ml-6 mr-6">
          <h2 className="text-xl font-bold">Portfolio</h2>
          <div className={styles.gridContainer}>
            {projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.imageContainer}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className={styles.projectImage}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.projectTitle}>{project.title}</span>
                  </div>
                </div>
                <p className={styles.description}>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
