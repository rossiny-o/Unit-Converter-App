import React, {useEffect, useState} from "react";
import axios from "axios";

export default function LengthConvert(props) {

    const [lengthList, setLengthOptions ] = useState([])
    
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

          setLengthOptions(response.data)
        }).catch(function (error) {
            console.error(error);
           });
     


      {
        //   axios.request(lengthOptions).then( response => {
    
        //      const lengthList = [{response}]
        //        console.log(response.data)
        //       console.log(lengthList)
        //     }
        //      ).catch(function (error) {
        //          console.error(error);
        //    });
        //   
      }

    
    }, []);

    const {
      selectedLength,
      onChangeLength
    }=props

   

    

   

    return(
        <div className="Length">
            <input type='number'></input>
            <select  value={selectedLength} onChange={onChangeLength} >
                {lengthList.map(option => (
                    <option key={lengthList.id} value={option}>{option}</option> 
                ))}
            </select>
        </div>
    );
}