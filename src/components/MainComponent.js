import React, {useState} from 'react';
import '../Main.css';
import {Button} from 'reactstrap';
import LengthConvert from './converters/LengthConvert';
import WeightConvert from './converters/WeightConvert';
import TempConvert from './converters/TempConvert';
import VolConvert from './converters/VolConvert';
import AreaConvert from './converters/AreaConvert';
import TimeConvert from './converters/TimeConvert';

function Main() {
    const [active, setActive] = useState('LengthConvert');
    return  (
        <div className='container-md'>
           <div className='row'>
                <h1>rossi convert</h1>
                <h3>Select a unit of measure:</h3>
           </div>

           {/* We will use Buttons to navigate between the 'Convert' components
           using useState and the onClick attribute*/}

             <div className='row'>
                <Button onClick={() => setActive("LengthConvert")}>Length</Button>
                <Button onClick={() => setActive("WeightConvert")}>Weight</Button>
                <Button onClick={() => setActive("TempConvert")}>Temperature</Button>
                <Button onClick={() => setActive("VolConvert")}>Volume</Button>
                <Button onClick={() => setActive("AreaConvert")}>Area</Button>
                <Button onClick={() => setActive("TimeConvert")}>Time</Button>
            </div>

            <div>

                {/* for Length */}

                { active === "LengthConvert" && 
                <div className='conversionBox'>
                <h2>Length</h2>
                <LengthConvert />
                <i className='upDownArrow' />
                <LengthConvert />
                </div> }


                {/* for Weight */}

                { active === "WeightConvert" && 
                <div className='conversionBox'>
                <h2>Weight</h2>
                <WeightConvert />
                <i className='upDownArrow' />
                <WeightConvert />
                </div> }

                {/* for Temp */}

                { active === "TempConvert" && 
                <div className='conversionBox'>
                <h2>Temperature</h2>
                <TempConvert />
                <i className='upDownArrow' />
                <TempConvert />
                </div> }

                {/* for Vol */}

                { active === "VolConvert" && 
                <div className='conversionBox'>
                <h2>Volume</h2>
                <VolConvert />
                <i className='upDownArrow' />
                <VolConvert />
                </div>}
                
                {/* for Area */}
                
                { active === "AreaConvert" && 
                <div className='conversionBox'>
                <h2>Area</h2>
                <AreaConvert />
                <i className='upDownArrow' />
                <AreaConvert />
                </div>}

                {/* for Time */}
                
                { active === "TimeConvert" && 
                <div className='conversionBox'>
                <h2>Time</h2>
                <TimeConvert />
                <i className='upDownArrow' />
                <TimeConvert />
                </div>}

            </div> 


            
            
        </div>
    );
}

export default Main;