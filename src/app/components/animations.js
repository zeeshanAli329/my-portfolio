'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants
export const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 60,
    transition: { duration: 0.6, ease: [0.61, 1, 0.88, 1] }
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.2
    }
  }
};

export const fadeInLeft = {
  initial: { 
    opacity: 0, 
    x: -60,
    transition: { duration: 0.6, ease: [0.61, 1, 0.88, 1] }
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const fadeInRight = {
  initial: { 
    opacity: 0, 
    x: 60,
    transition: { duration: 0.6, ease: [0.61, 1, 0.88, 1] }
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const scaleIn = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.6, ease: [0.61, 1, 0.88, 1] }
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const letterAnimation = {
  initial: { 
    opacity: 0, 
    y: 50 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const hoverScale = {
  scale: 1.05,
  transition: { 
    duration: 0.3,
    ease: "easeOut"
  }
};

export const tapScale = {
  scale: 0.95,
  transition: { 
    duration: 0.1 
  }
};

// Animation Components
export const AnimatedSection = ({ 
  children, 
  className = "", 
  variants = fadeInUp,
  delay = 0 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={variants}
      className={className}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
};

export const AnimatedDiv = ({ 
  children, 
  className = "", 
  variants = fadeInUp,
  delay = 0,
  whileHover,
  whileTap
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={variants}
      className={className}
      transition={{ delay }}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedText = ({ 
  text, 
  className = "", 
  delay = 0,
  once = true 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={staggerContainer}
      className={className}
    >
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={`${wordIndex}-${letterIndex}`}
              variants={letterAnimation}
              className="inline-block"
              transition={{ 
                delay: delay + (wordIndex * 0.1 + letterIndex * 0.03) 
              }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

export const AnimatedIcon = ({ 
  children, 
  className = "", 
  delay = 0 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
      transition={{ 
        duration: 0.8,
        delay,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      whileHover={{ 
        scale: 1.2, 
        rotate: 360,
        transition: { duration: 0.5 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedButton = ({ 
  children, 
  className = "", 
  onClick,
  type = "button"
}) => (
  <motion.button
    type={type}
    className={className}
    whileHover={hoverScale}
    whileTap={tapScale}
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.button>
);

export const AnimatedCard = ({ 
  children, 
  className = "", 
  delay = 0 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Specialized animation components
export const FloatingElement = ({ 
  children, 
  className = "" 
}) => (
  <motion.div
    className={className}
    animate={{
      y: [0, -15, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

export const PulseAnimation = ({ 
  children, 
  className = "" 
}) => (
  <motion.div
    className={className}
    animate={{
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

export const SlideInOnScroll = ({ 
  children, 
  direction = "left",
  className = "" 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    left: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 }
    },
    right: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 }
    },
    up: {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 }
    },
    down: {
      initial: { opacity: 0, y: -100 },
      animate: { opacity: 1, y: 0 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={variants[direction]}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};