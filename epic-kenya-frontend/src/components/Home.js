import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import heroBg from '../assets/hero-bg.jpg';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <div className="hero-overlay">
        <motion.section
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="magic-text" variants={textVariant}>
            Welcome to <span>Epic Kenya</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={textVariant}>
            Discover breathtaking landscapes, diverse wildlife, and vibrant cultures.
          </motion.p>

          <motion.button
            className="btn-bounce"
            onClick={() => navigate("/destinations")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Explore Now
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
};

export default Home;
