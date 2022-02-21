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


export default function Main(props) {

    const [active, setActive] = useState('LengthConvert')
    const {
        lengthList,
        weightList,
        tempList,
        volList,
        areaList,
        timeList,
    } = props


// for length
    const [fromLength, setFromLength] = useState()
    const [toLength, setToLength] = useState()
    const [lengthAmount, setLengthAmount] = useState(1)
    const [amountInFromLength, setAmountInFromLength] = useState(true)
    const [lengthResult, setLengthResult]  = useState()


    let toLengthAmount, fromLengthAmount
  if (amountInFromLength) {
    fromLengthAmount = lengthAmount
    toLengthAmount = lengthAmount * lengthResult
  } else {
    toLengthAmount = lengthAmount
    fromLengthAmount = lengthAmount / lengthResult
  }

    function handleLengthFromAmountChange(e) {
        setLengthAmount(e.target.value)
        setAmountInFromLength(true)
    }

    function handleLengthToAmountChange(e) {
        setLengthAmount(e.target.value)
        setAmountInFromLength(false)
    }


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
          const firstLength = response.data[38]
          setFromLength(response.data[28])
          setToLength(firstLength)
        }).catch(function (error) {
            console.error(error);
           });

    }, []);

    useEffect ( () => {
        const lengthConversion = {
            method: 'GET',
            url: 'https://units-converter.p.rapidapi.com/dev/length',
            params: {convert: `${lengthAmount}`, from: `${fromLength}` , to: `${toLength}` },
            headers: {
              'x-rapidapi-host': 'units-converter.p.rapidapi.com',
              'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
            }
          };
  
        //   We can initialize a lengthAmount for conversion.params.convert 
        // We can initialize conversion.params.from into the selected index (by the user) in the array response for line 48 in LengthConvert.js. 
          
          axios.request(lengthConversion).then(function (response) {
              setLengthResult(response.data.equal)
          }).catch(function (error) {
              console.error(error);
          });
    },[fromLength, toLength])

    useEffect ( () => {
        if (fromLength != null && toLength != null) {
            fetch(`https://units-converter.p.rapidapi.com/dev/length?convert=${lengthAmount}&from=${fromLength}&to=${toLength}`)
            .then(res => res.json())
            .then(response => setLengthResult(JSON.stringify(response.data(toLength))))
        }
    }, [fromLength, toLength] )

    // --------------------------------------

// for weight


    const [fromWeight, setFromWeight] = useState()
    const [toWeight, setToWeight] = useState()
    const [weightAmount, setWeightAmount] = useState(1)
    const [amountInFromWeight, setAmountInFromWeight] = useState(true)
    const [weightResult, setWeightResult] = useState()

    let toWeightAmount, fromWeightAmount
    if (amountInFromWeight) {
        fromWeightAmount = weightAmount
        toWeightAmount = weightAmount * weightResult
    } else {
        toWeightAmount = weightAmount
        fromWeightAmount = weightAmount / weightResult
    }
    
    function handleWeightFromAmountChange(e) {
        setWeightAmount(e.target.value)
        setAmountInFromWeight(true)
    }

    function handleWeightToAmountChange(e) {
        setWeightAmount(e.target.value)
        setAmountInFromWeight(false)
    }

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
          
    }, []);

    useEffect ( () => {
        const weightConversion = {
            method: 'GET',
            url: 'https://units-converter.p.rapidapi.com/dev/mass',
            params: {convert: `${weightAmount}`, from: `${fromWeight}` , to: `${toWeight}` },
            headers: {
              'x-rapidapi-host': 'units-converter.p.rapidapi.com',
              'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
            }
          };
  
          
          axios.request(weightConversion).then(function (response) {
              setWeightResult(response.data.equal)
          }).catch(function (error) {
              console.error(error);
          });
    },[fromWeight, toWeight]);

    useEffect ( () => {
        if (fromWeight != null && toWeight != null) {
            fetch(`https://units-converter.p.rapidapi.com/dev/mass?convert=${weightAmount}&from=${fromWeight}&to=${toWeight}`)
            .then(res => res.json())
            .then(response => setWeightResult(JSON.stringify(response.data(toWeight))))
        }
    }, [fromWeight, toWeight] )



// for Temperature


    const [fromTemp, setFromTemp] = useState()
    const [toTemp, setToTemp] = useState()
    const [tempAmount, setTempAmount] = useState(1)
    const [amountInFromTemp, setAmountInFromTemp] = useState(true)
    const [tempResult, setTempResult] = useState()

    let toTempAmount, fromTempAmount
    if (amountInFromTemp) {
        fromTempAmount = tempAmount
        toTempAmount = tempAmount * tempResult
    } else {
        toTempAmount = tempAmount
        fromTempAmount = tempAmount /tempResult
    }
    
    function handleTempFromAmountChange(e) {
        setTempAmount(e.target.value)
        setAmountInFromTemp(true)
    }

    function handleTempToAmountChange(e) {
        setTempAmount(e.target.value)
        setAmountInFromTemp(false)
    }

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
            const firstTemp = response.data[2]
                setFromTemp(response.data[0])
                setToTemp(firstTemp)

        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    useEffect ( () => {
        const tempConversion = {
            method: 'GET',
            url: 'https://units-converter.p.rapidapi.com/dev/temperature',
            params: {convert: `${tempAmount}`, from: `${fromTemp}` , to: `${toTemp}` },
            headers: {
              'x-rapidapi-host': 'units-converter.p.rapidapi.com',
              'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
            }
          };
  
          
          axios.request(tempConversion).then(function (response) {
              setTempResult(response.data.equal)
          }).catch(function (error) {
              console.error(error);
          });
    },[fromTemp ,toTemp]);

    useEffect ( () => {
        if (fromTemp != null && toTemp != null) {
            fetch(`https://units-converter.p.rapidapi.com/dev/temperature?convert=${tempAmount}&from=${fromTemp}&to=${toTemp}`)
            .then(res => res.json())
            .then(response => setTempResult(JSON.stringify(response.data(toTemp))))
        }
    }, [fromTemp, toTemp] )

    // for Volume
    const [fromVol, setFromVol] = useState()
    const [toVol, setToVol ]= useState()
    const [volAmount, setVolAmount] = useState(1)
    const [amountInFromVol, setAmountInFromVol] = useState(true)
    const [volResult, setVolResult] = useState()

    let toVolAmount, fromVolAmount
    if (amountInFromVol) {
        fromVolAmount = volAmount
        toVolAmount = volAmount * volResult
    } else {
        toVolAmount =volAmount
        fromVolAmount =volAmount /volResult
    }
    
    function handleVolFromAmountChange(e) {
        setVolAmount(e.target.value)
        setAmountInFromVol(true)
    }

    function handleVolToAmountChange(e) {
        setVolAmount(e.target.value)
        setAmountInFromVol(false)
    }

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
              const firstVol = response.data[61]
           setFromVol(response.data[29])
           setToVol(firstVol)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    useEffect ( () => {
        const volConversion = {
            method: 'GET',
            url: 'https://units-converter.p.rapidapi.com/dev/volume',
            params: {convert: `${volAmount}`, from: `${fromVol}` , to: `${toVol}` },
            headers: {
              'x-rapidapi-host': 'units-converter.p.rapidapi.com',
              'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
            }
          };
  
          
          axios.request(volConversion).then(function (response) {
            setVolResult(response.data.equal)
          }).catch(function (error) {
              console.error(error);
          });
    },[fromVol ,toVol]);
    
    
    useEffect ( () => {
        if (fromVol != null && toVol != null) {
            fetch(`https://units-converter.p.rapidapi.com/dev/volume?convert=${volAmount}&from=${fromVol}&to=${toVol}`)
            .then(res => res.json())
            .then(response => setVolResult(JSON.stringify(response.data(toVol))))
        }
    }, [fromVol, toVol] );



    // for Area
    const [fromArea, setFromArea] = useState()
    const [toArea, setToArea ]= useState()
    const [areaAmount, setAreaAmount] = useState(1)
    const [amountInFromArea, setAmountInFromArea] = useState(true)
    const [areaResult, setAreaResult] = useState()

    
    let toAreaAmount, fromAreaAmount
    if (amountInFromArea) {
      fromAreaAmount = areaAmount
      toAreaAmount = areaAmount * areaResult
    } else {
      toAreaAmount = areaAmount
      fromAreaAmount = areaAmount / areaResult
    }

    function handleAreaFromAmountChange(e) {
        setAreaAmount(e.target.value)
        setAmountInFromArea(true)
    }

    function handleAreaToAmountChange(e) {
        setAreaAmount(e.target.value)
        setAmountInFromArea(false)
    }

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

    useEffect ( () => {
        const areaConversion = {
            method: 'GET',
            url: 'https://units-converter.p.rapidapi.com/dev/area',
            params: {convert: `${areaAmount}`, from: `${fromArea}` , to: `${toArea}` },
            headers: {
              'x-rapidapi-host': 'units-converter.p.rapidapi.com',
              'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
            }
          };

          axios.request(areaConversion).then(function (response) {
            setAreaResult(response.data.equal)
        }).catch(function (error) {
            console.error(error);
        });
    },[fromArea , toArea])


    useEffect ( () => {
        if (fromArea != null && toArea != null) {
            fetch(`https://units-converter.p.rapidapi.com/dev/area?convert=${areaAmount}&from=${fromArea}&to=${toArea}`)
            .then(res => res.json())
            .then(response => setAreaResult(JSON.stringify(response.data(toArea))))
        }
        
    }, [fromArea, toArea] )


    // for Time
    const [fromTime, setFromTime] = useState()
    const [toTime, setToTime ]= useState()
    const [timeAmount, setTimeAmount] = useState(1)
    const [amountInFromTime, setAmountInFromTime] = useState(true)
    const [timeResult, setTimeResult] = useState()

    let toTimeAmount, fromTimeAmount

    if (amountInFromTime) {
    fromTimeAmount = timeAmount
    toTimeAmount = timeAmount * timeResult
    } else {
    toTimeAmount = timeAmount
    fromTimeAmount = timeAmount / timeResult
    }

    function handleTimeFromAmountChange(e) {
        setTimeAmount(e.target.value)
        setAmountInFromTime(true)
    }

    function handleTimeToAmountChange(e) {
        setTimeAmount(e.target.value)
        setAmountInFromTime(false)
    }

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
            const firstTime = response.data[29]
            setFromTime(response.data[9])
            setToTime(firstTime)
        }).catch(function (error) {
          console.error(error);
      });
    }, [])


    useEffect ( () => {
        const timeConversion = {
            method: 'GET',
            url: 'https://units-converter.p.rapidapi.com/dev/time',
            params: {convert: `${timeAmount}`, from: `${fromTime}` , to: `${toTime}` },
            headers: {
              'x-rapidapi-host': 'units-converter.p.rapidapi.com',
              'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
            }
        };
   
          
        axios.request(timeConversion).then(function (response) {
              setTimeResult(response.data.equal)
          }).catch(function (error) {
              console.error(error);
          });
        },[fromTime, toTime])

    useEffect ( () => {
        if (fromTime != null && toTime != null) {
            fetch(`https://units-converter.p.rapidapi.com/dev/time?convert=${timeAmount}&from=${fromTime}&to=${toTime}`)
            .then(res => res.json())
            .then(response => setTimeResult(JSON.stringify(response.data(toLength))))
        }
        

    }, [fromTime, toTime] )





  
// API calls
{
    // length
    // useEffect( () => {

    //     const lengthOptions = {
    //     method: 'GET',
    //     url: 'https://units-converter.p.rapidapi.com/dev/length/allUnits',
    //     headers: {
    //       'x-rapidapi-host': 'units-converter.p.rapidapi.com',
    //       'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
    //     }
    //   };

    //   axios.request(lengthOptions).then( (response) => {
    //       const firstLength = response.data[18]
    //       setFromLength(response.data[28])
    //       setToLength(firstLength)
    //     }).catch(function (error) {
    //         console.error(error);
    //        });

    // }, []);

    // useEffect ( () => {
    //     const conversion = {
    //         method: 'GET',
    //         url: 'https://units-converter.p.rapidapi.com/dev/length',
    //         params: {convert: `${lengthAmount}`, from: "inch" , to: 'foot-metric' },
    //         headers: {
    //           'x-rapidapi-host': 'units-converter.p.rapidapi.com',
    //           'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
    //         }
    //       };
  
    //     //   We can initialize a lengthAmount for conversion.params.convert 
    //     // We can initialize conversion.params.from into the selected index (by the user) in the array response for line 48 in LengthConvert.js. 
          
    //       axios.request(conversion).then(function (response) {
    //           console.log('Converted from inch to foot-metric => ')
    //           console.log(response.data);
    //           console.log(conversion.params.from)
    //           console.log(response.data.equal)
    //           setLengthResult(response.data.equal)
    //       }).catch(function (error) {
    //           console.error(error);
    //       });
    // },[])
    


    {// We need to make it so that (options.params.from) and (options.params.to) are initialized to be whatever value the user picks in the dropdown options for the measurements which is popularized by the array response for line 48 in LengthConvert.js. 

    // this may have to get this moved to LengthConvert.js
    // useEffect ( () => {
    //     const options = {
    //         method: 'GET',
    //         url: 'https://units-converter.p.rapidapi.com/dev/length',
    //         params: {convert: "5", from: 'inch', to: 'foot-metric' },
    //         headers: {
    //           'x-rapidapi-host': 'units-converter.p.rapidapi.com',
    //           'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
    //         }
    //       };

    //     //   We can initialize a lengthAmount for options.params.convert 
    //     // We can initialize options.params.from into the selected index (by the user) in the array response for line 48 in LengthConvert.js. 
          
    //       axios.request(options).then(function (response) {
    //           console.log('Converted from inch to foot-metric => ')
    //           console.log(response.data);
    //           console.log(options.params.from)
    //           console.log(response.data.equal)
    //       }).catch(function (error) {
    //           console.error(error);
    //       });
    // },[])}
    }
    // weight
   
    // temp
    // useEffect ( () => {
    //     const tempOptions = {
    //         method: 'GET',
    //         url: 'https://units-converter.p.rapidapi.com/dev/temperature/allUnits',
    //         headers: {
    //           'x-rapidapi-host': 'units-converter.p.rapidapi.com',
    //           'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
    //         }
    //       };
    
    //       axios.request(tempOptions).then( response => {
    //           const firstTemp = response.data[0]
    //         setFromTemp(response.data[2])
    //         setToTemp(firstTemp)

    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    // }, [])
    //vol
    // useEffect ( () => {
    //     const volOptions = {
    //         method: 'GET',
    //         url: 'https://units-converter.p.rapidapi.com/dev/volume/allUnits',
    //         headers: {
    //           'x-rapidapi-host': 'units-converter.p.rapidapi.com',
    //           'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
    //         }
    //       };
    
    //       axios.request(volOptions).then( response => {
    //           const firstVol = response.data[7]
    //        setFromVol(response.data[29])
    //        setToVol(firstVol)
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    // }, [])
    //area
    // useEffect( () => {

    //     const areaOptions = {
    //       method: 'GET',
    //       url: 'https://units-converter.p.rapidapi.com/dev/area/allUnits',
    //       headers: {
    //         'x-rapidapi-host': 'units-converter.p.rapidapi.com',
    //         'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
    //       }
    //     };
        
    //     axios.request(areaOptions).then(response => {
    //        const firstArea = response.data[29]
    //        setFromArea(response.data[35])
    //        setToArea(firstArea)
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
  
    // }, [])
    //time
    // useEffect( () => {
    //     const timeOptions = {
    //         method: 'GET',
    //         url: 'https://units-converter.p.rapidapi.com/dev/time/allUnits',
    //         headers: {
    //           'x-rapidapi-host': 'units-converter.p.rapidapi.com',
    //           'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
    //         }
    //       };
  
    //     axios.request(timeOptions).then(response => {
    //         const firstTime = response.data[35]
    //         setFromTime(response.data[9])
    //         setToTime(firstTime)
    //     }).catch(function (error) {
    //       console.error(error);
    //   });
    // }, [])

}
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
                <h4>From: </h4>

                <LengthConvert 
                    lengthList ={lengthList}
                    selectedLength= {fromLength}
                    onChangeLength = {e => setFromLength(e.target.value)}
                    onChangeLengthAmount = {handleLengthFromAmountChange}
                    lengthAmount ={fromLengthAmount}

                   
                
                />

                <h4>To: </h4>
                <LengthConvert 
                    lengthList ={lengthList}
                    selectedLength={toLength}
                    onChangeLength = {e => setToLength(e.target.value)} onChangeLengthAmount = {handleLengthToAmountChange}
                    lengthAmount ={toLengthAmount}
                />
                </div> }


                {/* for Weight */}

                { active === "WeightConvert" && 
                <div className='conversionBox'>
                <h2>Weight</h2>
                <h4>From: </h4>
                <WeightConvert 
                
                    weightList = {weightList}
                    selectedWeight={fromWeight}
                    onChangeWeight = {e => setFromWeight(e.target.value)}
                    onChangeWeightAmount = {handleWeightFromAmountChange}
                    weightAmount = {fromWeightAmount}
                />
                 <h4>To: </h4>
                <WeightConvert 
                    weightList = {weightList}
                    selectedWeight={toWeight}
                    onChangeWeight = {e => setToWeight(e.target.value)}
                    onChangeWeightAmount = {handleWeightToAmountChange}
                    weightAmount = {toWeightAmount}
                />
                </div> }

                {/* for Temp */}

                { active === "TempConvert" && 
                <div className='conversionBox'>
                <h2>Temperature</h2>
                <h4>From: </h4>
                <TempConvert 
                    tempList={tempList}
                    selectedTemp ={fromTemp}
                    onChangeTemp= {e => setFromTemp(e.target.value)}
                    onChangeTempAmount = {handleTempFromAmountChange}
                    tempAmount = {fromTempAmount}
                />
                 <h4>To: </h4>
                <TempConvert 
                    tempList={tempList}
                    selectedTemp ={toTemp}
                    onChangeTemp= {e => setToTemp(e.target.value)}
                    onChangeTempAmount = {handleTempToAmountChange}
                    tempAmount = {toTempAmount}

                />
                </div> }

                {/* for Vol */}

                { active === "VolConvert" && 
                <div className='conversionBox'>
                <h2>Volume</h2>
                <h4>From: </h4>
                <VolConvert 
                    volList = {volList}
                    selectedVol = {fromVol}
                    onChangeVol= {e => setFromVol(e.target.value)}
                    onChangeVolAmount = {handleVolFromAmountChange}
                    volAmount = {fromVolAmount}
                />
                 <h4>To: </h4>
                <VolConvert 
                    volList = {volList}
                    selectedVol = {toVol}
                    onChangeVol= {e => setToVol(e.target.value)}
                    onChangeVolAmount = {handleVolToAmountChange}
                    volAmount = {toVolAmount}
                />
                </div>}
                
                {/* for Area */}
                
                { active === "AreaConvert" && 
                <div className='conversionBox'>
                <h2>Area</h2>
                <h4>From: </h4>
                <AreaConvert 
                    areaList={areaList}
                    selectedArea = {fromArea}
                    onChangeArea = {e => setFromArea(e.target.value)}
                    onChangeAreaAmount = {handleAreaFromAmountChange}
                    areaAmount = {fromAreaAmount}  
                />
                 <h4>To: </h4>
                <AreaConvert 
                    areaList={areaList}
                    selectedArea = {toArea}
                    onChangeArea = {e => setToArea(e.target.value)}
                    onChangeAreaAmount = {handleAreaToAmountChange}
                    areaAmount = {toAreaAmount} 
                />
                </div>}

                {/* for Time */}
                
                { active === "TimeConvert" && 
                <div className='conversionBox'>
                <h2>Time</h2>
                <h4>From: </h4>
                <TimeConvert 
                    timeList={timeList}
                    selectedTime = {fromTime}
                    onChangeTime = {e => setFromTime(e.target.value)}
                    onChangeTimeAmount = {handleTimeFromAmountChange}
                    timeAmount = {fromTimeAmount} 


                />
                 <h4>To: </h4>
                <TimeConvert 
                    timeList={timeList}
                    selectedTime = {toTime}
                    onChangeTime = {e => setToTime(e.target.value)} 
                    onChangeTimeAmount = {handleTimeToAmountChange}
                    timeAmount = {toTimeAmount} 
                />
                </div>}

            </div> 


            
            
        </div>
    );
}