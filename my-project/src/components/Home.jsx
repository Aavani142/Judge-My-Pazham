import React from 'react';
import { Link } from 'react-router-dom';
import banana from '../assets/banana.png';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-300 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-yellow-400 rounded-3xl shadow-xl p-10 max-w-5xl flex flex-col md:flex-row items-center justify-between w-[90%]"
      >
        {/* Left Text */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="md:w-1/2 text-left"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-white to-yellow-100 text-transparent bg-clip-text mb-4 leading-tight drop-shadow-sm">
            Judge My Pazham
          </h1>
          <p className="text-white text-lg italic mb-3">
            — Because even bananas deserve their judgment day.
          </p>
          <p className="text-white text-md mb-6 leading-relaxed">
            Snap a pic and let our ML-powered fruit court decide: <br />
            <span className="font-semibold">Is this pazham perfect for pazhampori or ready for the compost bin?</span>
          </p>
          <div className="flex gap-4 mt-4">
            <Link to="/type">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-yellow-700 font-semibold px-5 py-2 rounded-lg hover:bg-yellow-200 transition shadow"
              >
                🍌 Type Of Banana
              </motion.button>
            </Link>
            <Link to="/ripeness">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white text-white font-semibold px-5 py-2 rounded-lg hover:bg-yellow-500 transition shadow"
              >
                🔍 Judge Now
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Banana Image + Text */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="md:w-1/3 mt-10 md:mt-0 flex justify-center relative"
        >
          <motion.img
            src={banana}
            alt="banana"
            className="w-48 md:w-64 z-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <motion.h2
            className="absolute top-10 left-0 text-white text-[5rem] md:text-[6rem] font-extrabold leading-[5rem] pointer-events-none tracking-tight select-none opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1 }}
          >
            BA<br />NA<br />NA
          </motion.h2>
        </motion.div>
      </motion.div>
    </div>
  );
}



