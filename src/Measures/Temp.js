import { useEffect, useState } from "react";
import axios from "axios";
import TempConvert from "../converters/TempConvert";

export function Temp(props) {
  // for Temp
  const [fromTemp, setFromTemp] = useState();
  const [toTemp, setToTemp] = useState();
  const [tempAmount, setTempAmount] = useState(1);
  const [amountInFromTemp, setAmountInFromTemp] = useState(true);
  const [tempResult, setTempResult] = useState();

  const [active] = useState("TempConvert");
  const [tempList] = props;

  let toTempAmount, fromTempAmount;
  if (amountInFromTemp) {
    fromTempAmount = tempAmount;
    toTempAmount = tempAmount * tempResult;
  } else {
    toTempAmount = tempAmount;
    fromTempAmount = tempAmount / tempResult;
  }

  function handleTempFromAmountChange(e) {
    setTempAmount(e.target.value);
    setAmountInFromTemp(true);
  }

  function handleTempToAmountChange(e) {
    setTempAmount(e.target.value);
    setAmountInFromTemp(false);
  }

  useEffect(() => {
    const tempOptions = {
      method: "GET",
      url: "https://units-converter.p.rapidapi.com/dev/temperature/allUnits",
      headers: {
        "x-rapidapi-host": "units-converter.p.rapidapi.com",
        "x-rapidapi-key": "23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd",
      },
    };

    axios
      .request(tempOptions)
      .then((response) => {
        const firstTemp = response.data[2];
        setFromTemp(response.data[0]);
        setToTemp(firstTemp);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const tempConversion = {
      method: "GET",
      url: "https://units-converter.p.rapidapi.com/dev/temperature",
      params: {
        convert: `${tempAmount}`,
        from: `${fromTemp}`,
        to: `${toTemp}`,
      },
      headers: {
        "x-rapidapi-host": "units-converter.p.rapidapi.com",
        "x-rapidapi-key": "23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd",
      },
    };

    //   We can initialize a tempAmount for temponversion.params.convert
    // We can initialize conversion.params.from into the selected index (by the user) in the array response for line 48 in TempConvert.js.

    axios
      .request(tempConversion)
      .then(function (response) {
        setTempResult(response.data.equal);
      })
      .catch(function (error) {
        console.error(error);
      });
  });

  useEffect(() => {
    if (fromTemp != null && toTemp != null) {
      fetch(
        `https://units-converter.p.rapidapi.com/dev/temperature?convert=${tempAmount}&from=${fromTemp}&to=${toTemp}`
      )
        .then((res) => res.json())
        .then((response) =>
          setTempResult(JSON.stringify(response.data(toTemp)))
        );
    }
  }, [fromTemp, toTemp, tempAmount]);

  if (active === "TempConvert") {
    return (
      <div className="conversionBox">
        <h2>Temperature</h2>
        <h4>From: </h4>

        <TempConvert
          tempList={tempList}
          selectedTemp={fromTemp}
          onChangeTemp={(e) => setFromTemp(e.target.value)}
          onChangeTempAmount={handleTempFromAmountChange}
          tempAmount={fromTempAmount}
        />

        <h4>To: </h4>
        <TempConvert
          tempList={tempList}
          selectedTemp={toTemp}
          onChangeTemp={(e) => setToTemp(e.target.value)}
          onChangeTempAmount={handleTempToAmountChange}
          tempAmount={toTempAmount}
        />
      </div>
    );
  }

  // --------------------------------------
}
