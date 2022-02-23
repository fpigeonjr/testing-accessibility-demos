import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import LoadedImageUrl from "workshop4-components/utils/loaded-image-url"

import "workshop4-components/slideshow/slideshow.scss"

const Slideshow = ({ images = [], imageURLs }) => {
  let [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  let [fullScreenMode, setFullScreenMode] = useState(false)

  const btnFullScreenRef = useRef(null)
  const btnCloseRef = useRef(null)
  const slideshowRef = useRef(null)

  const decrementSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1)
    } else {
      setCurrentSlideIndex(images.length - 1)
    }
  }
  const incrementSlide = () => {
    if (currentSlideIndex < images.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1)
    } else {
      setCurrentSlideIndex(0)
    }
  }
  const changeSlide = (index) => {
    setCurrentSlideIndex(index)
  }
  const enterFullScreen = () => {
    setFullScreenMode(true)
  }
  const closeFullScreen = () => {
    setFullScreenMode(false)
  }
  const handleScreenClick = (event) => {
    if (!slideshowRef.current.contains(event.target)) {
      setFullScreenMode(false)
    }
  }

  const slideshowKeyHandler = (event) => {
    event.preventDefault()
    if (fullScreenMode) {
      if (event.key === "Escape") {
        closeFullScreen()
      }
      if (event.key === "ArrowRight") {
        incrementSlide()
      }
      if (event.key === "ArrowLeft") {
        decrementSlide()
      }
    }
  }

  React.useEffect(() => {
    if (fullScreenMode) {
      slideshowRef.current.focus()
    }
  }, [currentSlideIndex])
  return (
    <>
      <button
        className="btn-slideshow-fullscreen"
        onClick={enterFullScreen}
        ref={btnFullScreenRef}
      >
        <span className="icon"></span>
      </button>
      <div
        aria-live="polite"
        className={`inspiration-slideshow ${
          fullScreenMode ? "fullscreen" : ""
        }`}
        onClick={(event) => handleScreenClick(event)}
        onKeyUp={slideshowKeyHandler}
        ref={slideshowRef}
        tabIndex="-1"
        role={fullScreenMode ? "application" : "region"}
        aria-roledescription="Image Slideshow"
      >
        <div className="slideshow-container" ref={slideshowRef}>
          {images.map((image, index) => {
            const imageUrl = imageURLs
              ? LoadedImageUrl(imageURLs, image.src)
              : image.src
            return (
              <figure
                className={`slide fade ${
                  currentSlideIndex === index ? "active" : ""
                }`}
                key={index}
              >
                <div className="numbertext">
                  {index + 1} / {images.length}
                </div>
                <img src={imageUrl} alt={image.alt} style={{ width: "100%" }} />
                <div className="text">{image.caption}</div>
              </figure>
            )
          })}

          <button className="prev" onClick={() => decrementSlide()}>
            &#10094;
          </button>
          <button className="next" onClick={() => incrementSlide()}>
            &#10095;
          </button>
        </div>
        <br />

        <ul className="dots">
          {images.map((image, index) => (
            <li
              className={`dot ${currentSlideIndex === index ? "active" : ""}`}
              key={index}
              onClick={() => changeSlide(index)}
            ></li>
          ))}
        </ul>
      </div>
    </>
  )
}

Slideshow.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      caption: PropTypes.string
    })
  ),
  imageURLs: PropTypes.object
}

export default Slideshow
