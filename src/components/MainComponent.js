import React, {useState} from 'react';
import '../Main.css';
import {Button, Nav } from 'reactstrap';
import LengthConvert from './converters/LengthConvert';
import WeightConvert from './converters/WeightConvert';

function Main() {
    const [active, setActive] = useState('LengthConvert');
    return  (
        <div className='container-md'>
           <div className='row'>
                <h1>rossi convert</h1>
                <h3>Select a unit of measure:</h3>
           </div>

           {/* We will use Buttons to navigate between the 'Convert' components
           using useState and the onClick attribute
           */}

           
               <Nav>
                    <Button outline onClick={LengthConvert} >Length</Button>
                    <Button outline onClick={WeightConvert}>Weight</Button>
                    <Button outline >Temperature</Button>
                    <Button outline >Volume</Button>
                    <Button outline >Area</Button>
                    <Button outline >Time</Button>
               </Nav>


            <div className='conversionBox'>
                <h2>Length</h2>
                <LengthConvert />
                <i className='upDownArrow' />
                <LengthConvert />
            </div>
            
        </div>
    );
}

export default Main;