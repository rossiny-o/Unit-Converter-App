import React , {useEffect, useState} from "react";
import axios from "axios";

export default function WeightConvert(props) {

    const [weightList, setWeightOptions ] = useState([])

    const {
        selectedWeight,
        onChangeWeight, 
        weightAmount,
        onChangeWeightAmount

    } = props

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
              setWeightOptions(response.data)
              console.log(response.data)
          }).catch(function (error) {
              console.error(error);
             });
          
    }, [])

  

    return(
        <div className="Weight">
            <input type='number' value={weightAmount} onChange={onChangeWeightAmount}></input>
            <select value={selectedWeight} onChange={onChangeWeight}>
            {weightList.map(option => (
                    <option key={weightList.id} value={option}>{option}</option> 
                ))}
            </select>
        </div>
    );
}