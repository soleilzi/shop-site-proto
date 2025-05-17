import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from "motion/react"
import ClothesPreviewBox from '../components/ClothesPreviewBox';
import bluesweater from "../assets/bluesweater.png"
import greyshorts from "../assets/greyshorts.png"
import tanpants from "../assets/tanpants.png"

const HomePage = () => {
  const [visible, setVisible] = useState(false);
  const horizontalScrollRef = useRef(null);

  {/* Setup for motto animate-out */ }
  const mottoRef = useRef(null);
  const isInView = useInView(mottoRef, { amount: 0.8 })
  const animationControls = useAnimation();
  const prevIsInViewRef = useRef(isInView);


  {/* Transform vertical mouse wheel scrolling into horizontal scroll*/ }
  useEffect(() => {
    const scrollContainer = horizontalScrollRef.current;
    if (!scrollContainer) return;

    const handleMouseWheel = (e) => {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY * 3;

    };
    scrollContainer.addEventListener('wheel', handleMouseWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleMouseWheel);
    }
  }, []);

  useEffect(() => {
    const currIsInView = isInView;
    const prevIsInView = prevIsInViewRef.current;

    if (currIsInView !== prevIsInView) {
      if (currIsInView) {
        animationControls.set({ x: 200 });
        animationControls.start({ opacity: 1, x: 0 })
      } else {
        animationControls.start({ opacity: 0, x: -200 });
      }
    }
    prevIsInViewRef.current = currIsInView;
  }, [isInView, animationControls])

  return (
    <div className='relative h-screen w-screen'>
      {/* Hamburger Button */}
      <button onClick={() => setVisible(!visible)}
        className="absolute top-2 left-2 z-50 text-black px-4 py-2 rounded cursor-pointer text-2xl">
        ☰
      </button>

      <div className={`fixed top-0 left-0 bottom-0 h-screen bg-white overflow-hidden z-60 transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col h-full text-xl'>
          <button onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer border-b">
            ☰ Close
          </button>
          <div className='p-4'>
            <p className='my-2'>Home</p>
            <p className='my-2'>Catalogue</p>
            <p className='my-2'>Contact Us</p>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={horizontalScrollRef} className='flex overflow-x-auto overflow-y-hidden h-screen w-screen scroll-smooth'>
        {/* Logo landing */}
        <section className="flex items-center justify-center flex-shrink-0 w-screen h-screen">
          <h1>LOGO</h1>
        </section>

        {/* Middle section with motto and clothes previews */}
        <section className="relative flex items-center justify-center flex-shrink-0 w-[130vw] h-screen p-8">
          <motion.div
            ref={mottoRef}
            initial={{ opacity: 0}}
            transition={{ duration: 0.8 }}
            animate={animationControls}
          >
            <h2 className="max-w-3xl text-center relative z-10 bg-white">
              MOTTO GOES HERE MOTTO GOES HERE
            </h2>
          </motion.div>

          {/* Placeholders for clothes images */}
          <ClothesPreviewBox distance={60} transitionDuration={0.7} imgSource={bluesweater} x={'top-10'} y={'left-10'} />
          <ClothesPreviewBox distance={80} transitionDuration={0.9} imgSource={greyshorts} x={'bottom-12'} y={'left-20'} />
          <ClothesPreviewBox distance={70} transitionDuration={1.3} imgSource={tanpants} x={'top-1/2'} y={'left-1/3'} />


          <motion.div
            className="absolute top-20 right-16 w-20 h-20 bg-black"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
          >
          </motion.div>


          <motion.div
            className="absolute bottom-8 right-8 w-20 h-20 bg-green-500"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
          />

          <motion.div
            className="absolute top-1/4 right-1/4 w-20 h-20 bg-pink-400"
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: false, amount: 0.2 }}
          />

        </section>

        {/* Newsletter signup section */}
        <section className="flex items-center justify-center flex-shrink-0 w-screen h-screen">
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className='text-center'>
              <h1>Sign up for our newsletter!</h1>
              <form className='w-full flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input type='email' placeholder='Enter your email' required className='w-full sm:flex-1 outline-none' />
                <button type='submit' className='bg-black text-white text-xs px-6 py-4'>Sign Up</button>
              </form>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;
