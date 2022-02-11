import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../Main.css';
import {Button} from 'reactstrap';
import LengthConvert from './converters/LengthConvert';
import WeightConvert from './converters/WeightConvert';
import TempConvert from './converters/TempConvert';
import VolConvert from './converters/VolConvert';
import AreaConvert from './converters/AreaConvert';
import TimeConvert from './converters/TimeConvert';


function Main(props) {
    const [active, setActive] = useState('LengthConvert');
    



//API calls start here ----
   {

    // length
   


    // weight
    useEffect ( () => {
        const weightOptions = {
            method: 'GET',
            url: 'https://units-converter.p.rapidapi.com/dev/mass/allUnits',
            headers: {
              'x-rapidapi-host': 'units-converter.p.rapidapi.com',
              'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
            }
          };
    
          axios.request(weightOptions).then(function (response) {
              const weightList = [{response}]

            console.log(response.data);
            console.log(weightList)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    // temp
    useEffect ( () => {
        const tempOptions = {
            method: 'GET',
            url: 'https://units-converter.p.rapidapi.com/dev/temperature/allUnits',
            headers: {
              'x-rapidapi-host': 'units-converter.p.rapidapi.com',
              'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
            }
          };
    
          axios.request(tempOptions).then(function (response) {
            console.log("temperature - " + response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    // volume
    useEffect ( () => {
        const volOptions = {
            method: 'GET',
            url: 'https://units-converter.p.rapidapi.com/dev/volume/allUnits',
            headers: {
              'x-rapidapi-host': 'units-converter.p.rapidapi.com',
              'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
            }
          };
    
          axios.request(volOptions).then(function (response) {
            console.log("volume - " + response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }, [])


    // area
    useEffect( () => {

        const areaOptions = {
          method: 'GET',
          url: 'https://units-converter.p.rapidapi.com/dev/area/allUnits',
          headers: {
            'x-rapidapi-host': 'units-converter.p.rapidapi.com',
            'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
          }
        };
        
        axios.request(areaOptions).then(function (response) {
            console.log("area - " + response.data);
        }).catch(function (error) {
            console.error(error);
        });
  
    }, [])

    // time
    useEffect( () => {
        const timeOptions = {
            method: 'GET',
            url: 'https://units-converter.p.rapidapi.com/dev/time/allUnits',
            headers: {
              'x-rapidapi-host': 'units-converter.p.rapidapi.com',
              'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
            }
          };
  
        axios.request(timeOptions).then(function (response) {
          console.log("time - " + response.data);
      }).catch(function (error) {
          console.error(error);
      });
    }, [])
   }
// API calls end here
    
   const {
        lengthList
   } = props
    
    return  (
        <div className='container-md'>
           <div className='row'>
                <h1>rossi convert</h1>
                <h3>Select a unit of measure:</h3>
           </div>

           {/* We will use Buttons to navigate between the 'Convert' components
           using useState and the onClick attribute*/}

             <div className='row'>
                <Button onClick={() => setActive("LengthConvert")}>Haiti</Button>
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
                <LengthConvert  lengthList ={lengthList}/>
                <i className='upDownArrow' />
                <LengthConvert lengthList ={lengthList} />
                </div> }


                {/* for Weight */}

                { active === "WeightConvert" && 
                <div className='conversionBox'>
                <h2>Weight</h2>
                <WeightConvert/>
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