import { SliderContext } from '../../contexts/Slider';
import { useContext } from 'react';
import LogSlider, {sliderCurve} from "./LogSlider"; 

const SliderInput = () => {
  const { state, dispatch }  = useContext(SliderContext);
  return (
    <div className="px-8 flex mt-12 md:mt-0 flex-row gap-x-4 items-center justify-between grow">
    <LogSlider 
      min={0.1}
      max={100}
      marks={[0.1, 1, 10, 100]}
      stepsInRange={100}
      onChange = {(value) => dispatch({type: 'slide', payload: sliderCurve(value).toFixed(1)})}
      />
    <div className="text-xl md:text-3xl flex justify-center items-center font-redaction w-12">
       Ξ{state.input}
    </div>
  </div>
  )
}

export default SliderInput;