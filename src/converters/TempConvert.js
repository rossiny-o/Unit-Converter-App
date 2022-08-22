import React, {useEffect, useState} from "react";
import axios from "axios";

export default function TempConvert(props) {

    const [tempList, setTempOptions ] = useState([])

    const {
        selectedTemp,
        onChangeTemp,
        tempAmount,
        onChangeTempAmount
    }=props

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
            setTempOptions(response.data)
            console.log(response.data)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

  

    return(
        <div className="Temp">
            <input type='number' value={tempAmount} onChange={onChangeTempAmount}></input>
            <select value={selectedTemp} onChange={onChangeTemp}>
            {tempList.map(option => (
                    <option key={tempList.id} value={option}>{option}</option> 
                ))}
            </select>
        </div>
    );
}