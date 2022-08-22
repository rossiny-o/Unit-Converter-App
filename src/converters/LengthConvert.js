import React, {useEffect, useState} from "react";
import axios from "axios";

export default function LengthConvert(props) {

  const [lengthList, setLengthOptions ] = useState([])
 


  // let toLength, fromLength
  // if (amountInFromLength) {
  //   fromLength = lengthAmount
  //   toLength = lengthAmount * lengthResult
  // } else {
  //   toLength = lengthAmount
  //   fromLength = lengthAmount / lengthResult
  // }


  // console.log(lengthResult)

  const {
    selectedLength,
    onChangeLength,
    lengthAmount,
    onChangeLengthAmount
   
    

  } = props

    
  useEffect( () => {

    const lengthOptions = {
      method: 'GET',
      url: 'https://units-converter.p.rapidapi.com/dev/length/allUnits',
      headers: {
        'x-rapidapi-host': 'units-converter.p.rapidapi.com',
        'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
      }
    };

    axios.request(lengthOptions)
      .then( response => {
        setLengthOptions(response.data)
          
      }).catch(function (error) {
        console.error(error);
    });
     
  },[])


  return(
    <div className="Length">
      <input type='number' value={lengthAmount} onChange= {onChangeLengthAmount}></input>
      <select value={selectedLength} onChange={onChangeLength}>
        {lengthList.map(option => (
          <option key={option} value={option}>{option}</option> 
        ))}
      </select>
    </div>
  );



  // end
}