import "./styles/slider.css";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { profiles } from "../../api_Calls/profiles";
import profile from "../../assets/profile.jpeg"
import {
  ArrowBackIosRounded,
  ArrowForwardIosOutlined,
  PlayArrow,
  StopRounded,
} from "@material-ui/icons"
function CompanyPhotoSlider({ company, setShowOverlay, showOverlay }) {
  const [showPlay, setShowPlay] = useState(false)
  const [showStop, setShowStop] = useState(false)
  const slideRef = useRef()
  const [sliderWidth, setSliderWidth] = useState()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [pause, setPause] = useState(false)
  const isMounted = useRef(true)

  const PauseSlideHandler = () => {
    setShowStop(false)
    setShowPlay(true)
    setPause(true)
  }
  const showPauseHandler = (e) => {
    setShowStop(true)
  }
  const hidePauseHandler = () => {
    setShowStop(false)
    setShowPlay(false)
    setPause(false)
  }
  const playSideHanlder = () => {
    setShowPlay(false)
    setPause(false)
    setShowStop(true)
  }
  useEffect(() => {
    if (isMounted.current) setSliderWidth(slideRef.current.clientWidth)
    const sliding = setInterval(() => {
      if (currentSlide === 0) setCurrentSlide(currentSlide + 1)
      if (currentSlide === profiles.length - 1)
        setCurrentSlide(currentSlide - 1)
      if (currentSlide === profiles.length - 1)
        setCurrentSlide(currentSlide - 1)
      clearInterval(sliding)
    }, 5000)
  }, [currentSlide])
  return (
    <>
      <div
        className="photo-slider col-12  col-md-7 row"
        onMouseEnter={showPauseHandler}
        onMouseLeave={hidePauseHandler}
        onClick={PauseSlideHandler}
      >
        {/* <div className="overlay"></div> */}
        <div className="slides-container flex-row col-12 col-md-10">
          {profiles.map((p) => {
            return (
              <div
                ref={slideRef}
                key={p.id}
                className="slide p-1 col-12 "
                style={{
                  transform: `translateX( -${sliderWidth * currentSlide}px)`,
                }}
              >
                <img src={profile} alt="" className="image-fluid" />
              </div>
            )
          })}
        </div>
        <div className="controls " style={{ width: sliderWidth }}>
          <div className="pause-parent">
            {" "}
            <PlayArrow
              className={showPlay ? "show-stop stop" : "stop"}
              onClick={playSideHanlder}
            />
            <StopRounded
              className={showStop ? "show-stop stop " : "stop"}
              onClick={PauseSlideHandler}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CompanyPhotoSlider;
