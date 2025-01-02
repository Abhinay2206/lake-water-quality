/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiDroplets } from "react-icons/gi";
import { BsArrowRightCircle, BsPlayCircle, BsChevronDoubleDown } from "react-icons/bs";
import { FaRobot, FaChartLine, FaCloudUploadAlt, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSpring, animated } from '@react-spring/web';

const Welcome = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const { scrollY } = useScroll();

  const handleContinue = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/page-layout');
    }, 600);
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 }
  });

  // Enhanced parallax effects with smoother transitions
  const heroY = useTransform(scrollY, [0, 800], [0, -250]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.9]);
  
  const featuresY = useTransform(scrollY, [200, 800], [200, -100]);
  const featuresScale = useTransform(scrollY, [200, 600], [0.8, 1]);
  const featuresOpacity = useTransform(scrollY, [100, 400], [0, 1]);
  
  const ctaY = useTransform(scrollY, [400, 1000], [200, -100]);
  const ctaScale = useTransform(scrollY, [400, 800], [0.8, 1]);

  // New parallax effects for contact and footer
  const contactY = useTransform(scrollY, [600, 1200], [200, -50]);
  const contactScale = useTransform(scrollY, [600, 1000], [0.8, 1]);
  const contactOpacity = useTransform(scrollY, [500, 800], [0, 1]);

  const footerY = useTransform(scrollY, [800, 1400], [100, 0]);
  const footerOpacity = useTransform(scrollY, [700, 1000], [0, 1]);
  
  const mainOpacity = useTransform(scrollY, [0, 400], [1, 0.7]);

  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0A1930] via-[#0F2847] to-[#1A3C6E]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-[#0A1930]/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <GiDroplets className="h-10 w-10 text-blue-400 animate-pulse" />
              <span className="ml-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">AquaMonitor</span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <button onClick={scrollToFeatures} className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Features</button>
              <button onClick={scrollToContact} className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Contact</button>
              <button onClick={handleContinue} className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 pt-40 pb-16 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'} transition-all duration-500`}>
        <motion.div 
          style={{ y: heroY, scale: heroScale, opacity: mainOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 perspective-1000"
        >
          <animated.div style={fadeIn}>
            <h1 className="text-6xl md:text-8xl font-extrabold mb-8 text-white leading-tight tracking-tight">
              Advanced Lake Water <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 animate-gradient">Quality Analysis</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed font-light mb-12">
              Leverage cutting-edge AI technology to monitor and analyze water quality through satellite imagery processing. Get accurate insights in real-time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className="group bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 text-white text-lg font-bold py-5 px-10 rounded-full shadow-lg hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
              >
                Start Free Analysis
                <BsArrowRightCircle className="inline-block ml-2 text-xl group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white text-lg font-bold py-5 px-10 rounded-full border-2 border-blue-400 hover:bg-blue-400/10 transition-all duration-300 flex items-center justify-center"
              >
                <BsPlayCircle className="mr-2 text-xl" />
                Watch Demo
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-12 flex justify-center"
            >
              <motion.button
                onClick={scrollToFeatures}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-blue-300 hover:text-blue-400 transition-colors duration-300 flex flex-col items-center"
              >
                <span className="text-sm mb-2">Scroll to learn more</span>
                <BsChevronDoubleDown className="text-2xl" />
              </motion.button>
            </motion.div>
          </animated.div>
        </motion.div>

        <motion.div 
          id="features"
          style={{ y: featuresY, scale: featuresScale, opacity: featuresOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 perspective-1000"
        >
          <motion.div whileHover={{ scale: 1.03, y: -5 }} className="p-10 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl hover:border-blue-400/30 transition-all duration-300">
            <FaRobot className="text-5xl text-cyan-400 mb-8" />
            <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Analysis</h3>
            <p className="text-gray-300 leading-relaxed text-lg">Our advanced ML algorithms process satellite imagery to deliver precise water quality assessments with 99.9% accuracy.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03, y: -5 }} className="p-10 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl hover:border-blue-400/30 transition-all duration-300">
            <FaChartLine className="text-5xl text-cyan-400 mb-8" />
            <h3 className="text-2xl font-bold text-white mb-4">Real-time Monitoring</h3>
            <p className="text-gray-300 leading-relaxed text-lg">Get instant insights with comprehensive water quality parameters and detailed confidence metrics.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03, y: -5 }} className="p-10 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl hover:border-blue-400/30 transition-all duration-300">
            <FaCloudUploadAlt className="text-5xl text-cyan-400 mb-8" />
            <h3 className="text-2xl font-bold text-white mb-4">Easy Integration</h3>
            <p className="text-gray-300 leading-relaxed text-lg">Simple API integration and intuitive interface for seamless satellite imagery processing.</p>
          </motion.div>
        </motion.div>

        <motion.div 
          style={{ y: ctaY, scale: ctaScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-12 shadow-2xl perspective-1000 mb-24"
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-6">Ready to get started?</h2>
          <p className="text-xl text-blue-200 mb-8">Join thousands of environmental researchers and organizations using our platform</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            className="group bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 text-white text-xl font-bold py-5 px-10 rounded-full shadow-lg hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
          >
            Begin Analysis
            <BsArrowRightCircle className="inline-block ml-2 text-2xl group-hover:translate-x-2 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        <motion.div 
          id="contact" 
          style={{ y: contactY, scale: contactScale, opacity: contactOpacity }}
          className="mb-24"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Get in Touch</h2>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transform transition-all duration-500 hover:scale-[1.02]">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300"
                  />
                </div>
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300"
                ></textarea>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer with Parallax */}
      <motion.footer 
        style={{ y: footerY, opacity: footerOpacity }}
        className="bg-[#0A1930]/90 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center">
                <GiDroplets className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold text-white">AquaMonitor</span>
              </div>
              <p className="text-gray-400">Advanced water quality monitoring powered by AI technology.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={scrollToFeatures} className="text-gray-400 hover:text-white transition-colors duration-300">Features</button></li>
                <li><button onClick={scrollToContact} className="text-gray-400 hover:text-white transition-colors duration-300">Contact</button></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a className="text-gray-400 hover:text-white transition-colors duration-300">Documentation</a></li>
                <li><a  className="text-gray-400 hover:text-white transition-colors duration-300">API Reference</a></li>
                <li><a  className="text-gray-400 hover:text-white transition-colors duration-300">Support</a></li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-white font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <motion.a whileHover={{ scale: 1.2 }}  className="text-gray-400 hover:text-white text-2xl transition-colors duration-300"><FaTwitter /></motion.a>
                <motion.a whileHover={{ scale: 1.2 }}  className="text-gray-400 hover:text-white text-2xl transition-colors duration-300"><FaLinkedin /></motion.a>
                <motion.a whileHover={{ scale: 1.2 }}  className="text-gray-400 hover:text-white text-2xl transition-colors duration-300"><FaGithub /></motion.a>
              </div>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400"
          >
            <p>&copy; 2024 AquaMonitor. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Welcome;
