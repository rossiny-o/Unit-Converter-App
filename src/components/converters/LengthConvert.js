import React, {useEffect, useState} from "react";
import axios from "axios";

export default function LengthConvert(props) {

    const [lengthList, setLengthOptions ] = useState([])

    console.log(lengthList)

    useEffect( () => {

        const lengthOptions = {
        method: 'GET',
        url: 'https://units-converter.p.rapidapi.com/dev/length/allUnits',
        headers: {
          'x-rapidapi-host': 'units-converter.p.rapidapi.com',
          'x-rapidapi-key': '23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd'
        }
      };

      axios.request(lengthOptions).then( response => {
          setLengthOptions(response.data)
      });


    //   axios.request(lengthOptions).then( response => {

    //     const lengthList = [{response}]
    //       console.log(response.data)
    //       console.log(lengthList)
    //     }
    //     ).catch(function (error) {
    //         console.error(error);
    //   });

    
    }, []);

    

   

    return(
        <div className="Length">
            <input className="input"type='number'></input>
            <select className="select">
                {lengthList.map(option => (
                    <option key={lengthList} value={option}>{option}</option> 
                ))}
            </select>
        </div>
    );
}