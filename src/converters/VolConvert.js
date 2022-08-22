import React, {useEffect, useState} from "react";
import axios from "axios";

export default function VolConvert(props) {

    const [volList, setVolOptions ] = useState([])

    const {
        selectedVol,
        onChangeVol,
        volAmount,
        onChangeVolAmount
    }=props

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
            setVolOptions(response.data)
            console.log(response.data)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

  

    return(
        <div className="Vol">
            <input type='number' value= {volAmount} onChange= {onChangeVolAmount}></input>
            <select value={selectedVol} onChange={onChangeVol}>
            {volList.map(option => (
                    <option key={volList.id} value={option}>{option}</option> 
                ))}
            </select>
        </div>
    );
}