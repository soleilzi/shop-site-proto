import React, { useEffect, useRef, useState } from 'react';

const HomePage = () => {
  const [visible, setVisible] = useState(false);
  const horizontalScrollRef = useRef(null);


  {/* Transform vertical mouse wheel scrolling into horizontal scroll*/}
  useEffect(() => {
    const scrollContainer = horizontalScrollRef.current;

    const handleMouseWheel = (e) => {
      if (scrollContainer) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY * 3;
      }
    };
    scrollContainer.addEventListener('wheel', handleMouseWheel, {passive: false});

    return() => {
      scrollContainer.removeEventListener('wheel', handleMouseWheel);
    }
  }, [])

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
        <section className="relative flex items-center justify-center flex-shrink-0 w-[140vw] h-screen p-8">
          <h2 className="max-w-3xl text-center z-10">
            MOTTO GOES HERE MOTTO GOES HERE
          </h2>

          {/* Placeholders for clothes images */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-400" />
          <div className="absolute top-20 right-16 w-20 h-20 bg-black" />
          <div className="absolute bottom-12 left-20 w-20 h-20 bg-yellow-300" />
          <div className="absolute bottom-8 right-8 w-20 h-20 bg-green-500" />
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-500" />
          <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-pink-400" />
          <div className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-purple-500" />
        </section>

        {/* Newsletter signup section */}
        <section className="flex items-center justify-center flex-shrink-0 w-screen h-screen">
          <div className='text-center'>
            <h1>Sign up for our newsletter!</h1>
            <form className='w-full flex items-center gap-3 mx-auto my-6 border pl-3'>
              <input type='email' placeholder='Enter your email' required className='w-full sm:flex-1 outline-none' />
              <button type='submit' className='bg-black text-white text-xs px-6 py-4'>Sign Up</button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;
