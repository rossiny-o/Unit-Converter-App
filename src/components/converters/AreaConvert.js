import React, {useEffect, useState} from "react";
import axios from "axios";

export default function AreaConvert(props) {

    const [areaList, setAreaOptions ] = useState([])


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
            setAreaOptions(response.data)
        }).catch(function (error) {
            console.error(error);
        });
  
    }, [])

    const { 
        selectedArea,
        onChangeArea
    } =props

    return(
        <div className="Area">
            <input type='number'></input>
            <select value={selectedArea} onChange={onChangeArea}>
            {areaList.map(option => (
                    <option key={areaList.id} value={option}>{option}</option> 
                ))}
            </select>
        </div>
    );
}