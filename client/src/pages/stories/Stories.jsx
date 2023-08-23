import './stories.scss'
import { stories } from '../../assets/data'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';

const Stories = () => {
  const [sliderWidth, setSliderWidth] = useState()
  const handleSlider = (direction) => {
    if (direction === 'left') {
      
    } 
  }
  return (
    <div className="stories">
      
      {/* <div className="sliderButtonContainer">
        <ArrowBackIosIcon className='icon' onClick={handleSlider('left')}/>
        <ArrowForwardIosIcon className='icon' onClick={handleSlider('right')}/>
      </div> */}

    {stories.map(story=>(
      <div className="story" key={story.id}>
        <img src={story.img} alt="" />
        <span>{story.name}</span>
        {story.id === 1 && (<button>+</button>)}
      </div>
    ))}
  </div>
  )
}

export default Stories