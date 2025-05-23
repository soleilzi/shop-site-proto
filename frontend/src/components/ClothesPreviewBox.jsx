import React from 'react'
import { motion } from 'motion/react'

const ClothesPreviewBox = ({ distance, transitionDuration, imgSource, y, x }) => {
  return (
    <motion.div
      className={`absolute ${y} ${x}
                 w-20 h-20 
                 sm:w-24 sm:h-24 
                 md:w-32 md:h-32 
                 lg:w-40 lg:h-40 `}
      initial={{ opacity: 0, x: distance }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: transitionDuration }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <img src={imgSource} className="w-full h-full object-contain" />
    </motion.div>
  )
}

export default ClothesPreviewBox