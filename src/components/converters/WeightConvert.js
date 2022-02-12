import React , {useEffect, useState} from "react";
import axios from "axios";

export default function WeightConvert(props) {

    const [weightList, setWeightOptions ] = useState([])

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

          {
            //   axios.request(weightOptions).then(function (response) {
        //     const weightList = [{response}]

        //     console.log(response.data);
        //     console.log(weightList)
        // }).catch(function (error) {
        // //     console.error(error);
        // });
          }
          
    }, [])

    const {
        selectedWeight,
        onChangeWeight
    } = props

    return(
        <div className="Weight">
            <input type='number'></input>
            <select value={selectedWeight} onChange={onChangeWeight}>
            {weightList.map(option => (
                    <option key={weightList.id} value={option}>{option}</option> 
                ))}
            </select>
        </div>
    );
}