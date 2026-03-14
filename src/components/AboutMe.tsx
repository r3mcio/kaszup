"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaMicrophoneAlt, FaClock, FaTheaterMasks, FaHandshake } from 'react-icons/fa';

export default function AboutMe() {
  const t = useTranslations('AboutMe');

  const traits = [
    { key: 'trait1', icon: FaMicrophoneAlt },
    { key: 'trait2', icon: FaClock },
    { key: 'trait3', icon: FaTheaterMasks },
    { key: 'trait4', icon: FaHandshake },
  ];

  return (
    <section id="about" className="w-full py-24 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Text */}
        <div className="flex flex-col space-y-8">
          <div>
            <motion.h2 
              className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('title')}
            </motion.h2>
            <motion.h3 
              className="text-xl md:text-2xl font-medium text-emerald-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('subtitle')}
            </motion.h3>
            <motion.p 
              className="text-lg text-zinc-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('description')}
            </motion.p>
          </div>
        </div>

        {/* Right Column: Traits & Mission */}
        <div className="flex flex-col space-y-12">
          {/* Mission Box */}
          <motion.div 
            className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden group"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-emerald-500 inline-block"></span>
                {t('goalsTitle')}
              </h4>
              <p className="text-zinc-400 leading-relaxed">
                {t('goalsDesc')}
              </p>
            </div>
          </motion.div>

          {/* Traits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {traits.map((trait, index) => {
              const Icon = trait.icon;
              return (
                <motion.div 
                  key={trait.key}
                  className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/[0.04] transition-all duration-300 border border-transparent hover:border-white/10 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <Icon size={20} />
                  </div>
                  <div className="flex items-center h-12">
                    <h5 className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {t(trait.key)}
                    </h5>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
