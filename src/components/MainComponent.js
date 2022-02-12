import React, {useEffect, useState} from 'react';
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

    const [active, setActive] = useState('LengthConvert')
    const [fromLength, setFromLength] = useState()
    const [toLength, setToLength] = useState()
    const [fromWeight, setFromWeight] = useState()
    const [toWeight, setToWeight] = useState()
    const [fromTemp, setFromTemp] = useState()
    const [toTemp, setToTemp] = useState()
    const [fromVol, setFromVol] = useState()
    const [toVol, setToVol ]= useState()
    const [fromArea, setFromArea] = useState()
    const [toArea, setToArea ]= useState()
    const [fromTime, setFromTime] = useState()
    const [toTime, setToTime ]= useState()


    const {
        lengthList,
        weightList,
        tempList,
        volList,
        areaList,
        timeList,
    } = props

// API calls

    // length
    useEffect( () => {

        const lengthOptions = {
        method: 'GET',
        url: 'https://units-converter.p.rapidapi.com/dev/length/allUnits',
        headers: {
          'x-rapidapi-host': 'units-converter.p.rapidapi.com',
          'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
        }
      };

      axios.request(lengthOptions).then( (response) => {
          const firstLength = response.data[18]
          setFromLength(response.data[28])
          setToLength(firstLength)
        }).catch(function (error) {
            console.error(error);
           });

    
    }, []);
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
          
          axios.request(weightOptions).then( response => {
            const firstWeight = response.data[18]
            setFromWeight(response.data[29])
            setToWeight(firstWeight)
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
    
          axios.request(tempOptions).then( response => {
              const firstTemp = response.data[0]
            setFromTemp(response.data[2])
            setToTemp(firstTemp)

        }).catch(function (error) {
            console.error(error);
        });
    }, [])
    //vol
    useEffect ( () => {
        const volOptions = {
            method: 'GET',
            url: 'https://units-converter.p.rapidapi.com/dev/volume/allUnits',
            headers: {
              'x-rapidapi-host': 'units-converter.p.rapidapi.com',
              'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
            }
          };
    
          axios.request(volOptions).then( response => {
              const firstVol = response.data[7]
           setFromVol(response.data[29])
           setToVol(firstVol)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])
    //area
    useEffect( () => {

        const areaOptions = {
          method: 'GET',
          url: 'https://units-converter.p.rapidapi.com/dev/area/allUnits',
          headers: {
            'x-rapidapi-host': 'units-converter.p.rapidapi.com',
            'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
          }
        };
        
        axios.request(areaOptions).then(response => {
           const firstArea = response.data[29]
           setFromArea(response.data[35])
           setToArea(firstArea)
        }).catch(function (error) {
            console.error(error);
        });
  
    }, [])
    //time
    useEffect( () => {
        const timeOptions = {
            method: 'GET',
            url: 'https://units-converter.p.rapidapi.com/dev/time/allUnits',
            headers: {
              'x-rapidapi-host': 'units-converter.p.rapidapi.com',
              'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
            }
          };
  
        axios.request(timeOptions).then(response => {
            const firstTime = response.data[35]
            setFromTime(response.data[9])
            setToTime(firstTime)
        }).catch(function (error) {
          console.error(error);
      });
    }, [])

    
    return  (

// Title
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

{/* Button Onclick event */}

            <div>

                {/* for Length */}

                { active === "LengthConvert" && 
                <div className='conversionBox'>
                <h2>Length</h2>
                <LengthConvert 
                    lengthList ={lengthList}
                    selectedLength= {fromLength}
                    onChangeLength = {e => setFromLength(e.target.value)}
                   
                
                />
                <i className='upDownArrow' />
                <LengthConvert 
                    lengthList ={lengthList}
                    selectedLength={toLength}
                    onChangeLength = {e => setToLength(e.target.value)}
                />
                </div> }


                {/* for Weight */}

                { active === "WeightConvert" && 
                <div className='conversionBox'>
                <h2>Weight</h2>
                <WeightConvert 
                
                    weightList = {weightList}
                    selectedWeight={fromWeight}
                    onChangeWeight = {e => setFromWeight(e.target.value)}
                />
                <i className='upDownArrow' />
                <WeightConvert 
                    weightList = {weightList}
                    selectedWeight={toWeight}
                    onChangeWeight = {e => setToWeight(e.target.value)}
                />
                </div> }

                {/* for Temp */}

                { active === "TempConvert" && 
                <div className='conversionBox'>
                <h2>Temperature</h2>
                <TempConvert 
                    tempList={tempList}
                    selectedTemp ={fromTemp}
                    onChangeTemp= {e => setFromTemp(e.target.value)}
                />
                <i className='upDownArrow' />
                <TempConvert 
                    tempList={tempList}
                    selectedTemp ={toTemp}
                    onChangeTemp= {e => setToTemp(e.target.value)}
                />
                </div> }

                {/* for Vol */}

                { active === "VolConvert" && 
                <div className='conversionBox'>
                <h2>Volume</h2>
                <VolConvert 
                    volList = {volList}
                    selectedVol = {fromVol}
                    onChangeVol= {e => setFromVol(e.target.value)}
                />
                <i className='upDownArrow' />
                <VolConvert 
                    volList = {volList}
                    selectedVol = {toVol}
                    onChangeVol= {e => setToVol(e.target.value)}
                />
                </div>}
                
                {/* for Area */}
                
                { active === "AreaConvert" && 
                <div className='conversionBox'>
                <h2>Area</h2>
                <AreaConvert 
                    areaList={areaList}
                    selectedArea = {fromArea}
                    onChangeArea = {e => setFromArea(e.target.value)} 
                />
                <i className='upDownArrow' />
                <AreaConvert 
                    areaList={areaList}
                    selectedArea = {toArea}
                    onChangeArea = {e => setToArea(e.target.value)} 
                />
                </div>}

                {/* for Time */}
                
                { active === "TimeConvert" && 
                <div className='conversionBox'>
                <h2>Time</h2>
                <TimeConvert 
                    timeList={timeList}
                    selectedTime = {fromTime}
                    onChangeTime = {e => setFromTime(e.target.value)} 
                />
                <i className='upDownArrow' />
                <TimeConvert 
                    timeList={timeList}
                    selectedTime = {toTime}
                    onChangeTime = {e => setToTime(e.target.value)} 
                />
                </div>}

            </div> 


            
            
        </div>
    );
}

export default Main;