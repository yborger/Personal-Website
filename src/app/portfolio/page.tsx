import React from 'react';
import Layout from '../layout';
import Image from 'next/image';
import styles from './portfolio.module.css';

const projects = [
  { id: 1, title: "Music Recommendation App", image: "/portfolio_imgs/music-app_phone concept 1.jpg", link: "/portfolio/cases/MusicRecommendationApp" },
  { id: 2, title: "Music Menu UI", image: "/portfolio_imgs/music-menu ui basic pre-feedback.jpg", link: "/portfolio/cases/MusicMenu" },
  { id: 3, title: "Product Design", image: "/portfolio_imgs/plant parenthood button.png", link: "/portfolio/cases/ProductDesign" },
];

interface Project {
  title: string;
  image: string;
  link: string; // field for the project link -- new page
}

const PortfolioItem: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className={styles.projectCard}>
      <a href={project.link} className={styles.imageContainer}>
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
      </a>
    </div>
  );
};

const Portfolio: React.FC = () => {
  return (
    <Layout>
      <section className="text-spacing">
        <div className="ml-6 mr-6">
          <h2 className="text-xl font-bold">Portfolio</h2>
          <div className={styles.gridContainer}>
            {projects.map((project) => (
              <PortfolioItem key={project.id} project={project} />
              
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
