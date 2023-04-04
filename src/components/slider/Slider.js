import React, { useEffect, useState } from 'react'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai"
import { sliderData } from './slider-data'
import "./Slider.scss"

const Slider = () => {
    const [currentSlide, setCurrentSlinde] = useState(0)
    const slideLength = sliderData.length
    console.log(slideLength)

    // AUTO SCROLL AFTE SOME SECS
    const autoScroll = true
    let slideInterval;
    let intervalTime = 5000

    const nextSlide =()=>{
        setCurrentSlinde(currentSlide ===slideLength -1 ? 0 : currentSlide +1);
    }
    const prevSlide =()=>{
        setCurrentSlinde(currentSlide === 0 ? slideLength -1 : currentSlide -1);
    }

    // USE EFFECT FOR AUTO SCROLL
    
    useEffect(()=>{
        setCurrentSlinde(0)
    },[])

    function auto(){
        slideInterval = setInterval(nextSlide, intervalTime)
    }

    useEffect (()=>{
        if (autoScroll){
            auto();
        }
        return()=>{
            clearInterval(slideInterval)
        }

    },[currentSlide])
  return (
    <div className='slider'>
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide}/>
      <AiOutlineArrowRight className="arrow next"onClick={nextSlide}/>

      {sliderData.map((slide, index)=>{
          const {image, heading, desc} = slide
          return(
              <div key={index} className={index === currentSlide ? "slide current": "slide"}>
                  {index === currentSlide && (
                      <>
                      <img src={image} alt='slide'/>

                      <div className='content'>
                          <h2>{heading}</h2>
                          <p>{desc}</p>
                          <hr/>
                          <a href='#product' className='--btn --btn-primary'>Buy Now</a>

                      </div>
                      </>
                  )}

                </div>
              
          )
      })}
    </div>
  )
}

export default Slider
