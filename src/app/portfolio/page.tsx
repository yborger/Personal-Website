import React from 'react';
import Layout from '../layout';
import PortfolioItem from './PortfolioItem';
import styles from './portfolio.module.css';

const projects = [
  { id: 1, title: "Music Recommendation App", description: "Description for Project 1", image: "/portfolio_imgs/music-app_phone concept 1.jpg" },
  { id: 2, title: "Music Menu UI", description: "Description for Project 2", image: "/portfolio_imgs/music-menu ui basic pre-feedback.jpg" },
  { id: 3, title: "Plant Parenthood", description: "Description for Project 3", image: "/portfolio_imgs/plant parenthood button.png" },
];

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
