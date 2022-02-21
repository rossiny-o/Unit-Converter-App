import React, {useEffect, useState} from "react";
import axios from "axios";

export default function TimeConvert(props) {

    const [timeList, setTimeOptions] = useState([])

    const {selectedTime, onChangeTime, timeAmount, onChangeTimeAmount} =props

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
            setTimeOptions(response.data)
        }).catch(function (error) {
          console.error(error);
      });
    }, [])

   
   

    return(
        <div className="Time">
            <input type='number' value={timeAmount} onChange={onChangeTimeAmount}></input>
            <select value={selectedTime} onChange={onChangeTime}>
            {timeList.map(option => (
                    <option key={timeList.id} value={option}>{option}</option> 
                ))}
            </select>
        </div>
    );
}