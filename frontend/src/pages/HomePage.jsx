import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from "motion/react"
import ClothesPreviewBox from '../components/ClothesPreviewBox';
import chairs from "../assets/chairs.webp"
import cat from "../assets/cat.webp"
import dice1 from "../assets/dice1.webp"
import dice2 from "../assets/dice2.webp"
import hat from "../assets/hat.webp"
import heart from "../assets/heart.webp"
import hoodie from "../assets/hoodie.webp"
import bracelet from "../assets/bracelet.webp"
import carabiner from "../assets/carabiner.webp"
import cassette from "../assets/cassette.webp"
import espresso_machine from "../assets/espresso_machine.webp"
import flower from "../assets/flower.webp"
import glasses from "../assets/glasses.webp"
import ring from "../assets/ring.webp"
import RT from "../assets/RT.webp"
import skateboard from "../assets/skateboard.webp"
import socks from "../assets/socls.webp"
import stamp from "../assets/stamp.webp"


const HomePage = () => {
  const [visible, setVisible] = useState(false);
  const [mottoVisible, setMottoVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const horizontalScrollRef = useRef(null);
  const mottoRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const scrollContainer = horizontalScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const scrollPosition = scrollContainer.scrollLeft;
        const screenWidth = window.innerWidth;

        const enterThreshold = screenWidth * 0.8;
        const exitThreshold = screenWidth * 1.7; // This is relative to the start of the scroll container

        if (scrollPosition >= enterThreshold && scrollPosition < exitThreshold) {
          if (!mottoVisible) {
            setMottoVisible(true);
            setIsExiting(false);
          }
        } else {
          if (mottoVisible && !isExiting) {
            setIsExiting(true);
            setTimeout(() => {
              setMottoVisible(false);
              setIsExiting(false);
            }, 1000);
          }
        }
      }, 50);
    };

    const handleMouseWheel = (e) => {
      e.preventDefault();
      const scrollSpeed = 2;
      scrollContainer.scrollLeft += e.deltaY * scrollSpeed;
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    scrollContainer.addEventListener('wheel', handleMouseWheel, { passive: false });

    // Initial check in case the motto should be visible on load (e.g., if already scrolled)
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('wheel', handleMouseWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    }
  }, [mottoVisible, isExiting]); // Added isExiting to dependencies

  return (
    <div className='relative h-screen w-screen'>
      {/* Motto - Fixed Position */}
      {mottoVisible && (
        <motion.div
          ref={mottoRef}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          initial={{ opacity: 0, x: 400 }}
          animate={{
            opacity: isExiting ? 0 : 1,
            x: isExiting ? -400 : 0
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h2 className="max-w-3xl text-center relative z-10 p-4 text-3xl font-bold">
            MOTTO GOES HERE MOTTO GOES HERE
          </h2>
        </motion.div>
      )}

      {/* Hamburger Button */}
      <button onClick={() => setVisible(!visible)}
        className="absolute top-2 left-2 z-[70] text-black px-4 py-2 rounded cursor-pointer text-2xl"> {/* Increased z-index */}
        ☰
      </button>

      {/* Side Menu */}
      <div className={`fixed top-0 left-0 bottom-0 h-screen bg-white overflow-hidden z-[60] transition-all duration-300 ease-in-out ${visible ? 'w-full sm:w-1/3 md:w-1/4' : 'w-0'}`}> {/* Adjusted width and duration */}
        <div className='flex flex-col h-full text-xl'>
          <button onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer border-b hover:bg-gray-100"> {/* Added hover effect */}
            ☰ Close
          </button>
          <div className='p-4'>
            <p className='my-2 hover:text-blue-500 cursor-pointer'>Home</p> {/* Added hover effect and cursor */}
            <p className='my-2 hover:text-blue-500 cursor-pointer'>Catalogue</p>
            <p className='my-2 hover:text-blue-500 cursor-pointer'>Contact Us</p>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={horizontalScrollRef} className='flex overflow-x-auto overflow-y-hidden h-screen w-screen scroll-smooth'>
        {/* Logo landing */}
        <section className="flex items-center justify-center flex-shrink-0 w-screen h-screen">
          <h1>LOGO</h1>
        </section>

        {/* Middle section with clothes previews - Images are positioned relative to this section */}
        <section className="relative flex items-center justify-center flex-shrink-0 w-[130vw] h-screen p-8">
          {/* x prop: Tailwind class for vertical positioning (e.g., 'top-10', 'bottom-1/4', 'top-1/2')
            y prop: Tailwind class for horizontal positioning (e.g., 'left-10', 'right-1/4', 'left-1/2')
            Remember: 'left-1/2' or 'right-1/2' would be half of the 130vw section width.
                      'top-1/2' would be half of the section height.
                      You might need to use -translate-x-1/2 or -translate-y-1/2 for true centering of an item.
          */}

          <ClothesPreviewBox distance={60} transitionDuration={0.7} imgSource={dice1} x={'top-[15%]'} y={'left-[5%]'} />
          <ClothesPreviewBox distance={80} transitionDuration={0.9} imgSource={chairs} x={'bottom-[20%]'} y={'left-[15%]'} />
          <ClothesPreviewBox distance={70} transitionDuration={1.3} imgSource={cat} x={'top-[10%]'} y={'left-[30%]'} />
          <ClothesPreviewBox distance={75} transitionDuration={1.1} imgSource={hat} x={'top-[35%]'} y={'left-[20%]'} />
          <ClothesPreviewBox distance={65} transitionDuration={0.8} imgSource={heart} x={'top-1/2'} y={'left-[40%]'} /> {/* Example with top-1/2 */}
          <ClothesPreviewBox distance={85} transitionDuration={1.4} imgSource={hoodie} x={'bottom-[10%]'} y={'left-[35%]'} />
          
          {/* Centered Items (approximate for the 130vw section) */}
          <ClothesPreviewBox distance={70} transitionDuration={1.0} imgSource={dice2} x={'top-[20%]'} y={'left-[50%]'} /> {/* dice2 should be a unique image file */}
          <ClothesPreviewBox distance={90} transitionDuration={1.2} imgSource={carabiner} x={'bottom-[25%]'} y={'left-[55%]'} />
          <ClothesPreviewBox distance={60} transitionDuration={0.9} imgSource={cassette} x={'top-[45%]'} y={'left-[60%]'} />
          
          <ClothesPreviewBox distance={80} transitionDuration={1.3} imgSource={espresso_machine} x={'top-[10%]'} y={'right-[30%]'} /> {/* Using right positioning */}
          <ClothesPreviewBox distance={70} transitionDuration={1.1} imgSource={flower} x={'top-[30%]'} y={'right-[15%]'} />
          <ClothesPreviewBox distance={75} transitionDuration={0.9} imgSource={glasses} x={'bottom-[30%]'} y={'right-[25%]'} />
          <ClothesPreviewBox distance={65} transitionDuration={1.2} imgSource={ring} x={'top-[50%]'} y={'right-[5%]'} /> {/* Closer to the right edge */}
          
          <ClothesPreviewBox distance={85} transitionDuration={0.8} imgSource={RT} x={'bottom-[5%]'} y={'right-[35%]'} />
          <ClothesPreviewBox distance={70} transitionDuration={1.4} imgSource={skateboard} x={'top-[60%]'} y={'left-[10%]'} />
          <ClothesPreviewBox distance={75} transitionDuration={1.0} imgSource={socks} x={'bottom-[15%]'} y={'right-[45%]'} /> {/* socks path might need fix */}
          <ClothesPreviewBox distance={60} transitionDuration={1.3} imgSource={stamp} x={'top-[5%]'} y={'right-[50%]'} /> {/* stamp path might need fix */}
          <ClothesPreviewBox distance={80} transitionDuration={1.1} imgSource={bracelet} x={'bottom-[40%]'} y={'left-[25%]'} />

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
