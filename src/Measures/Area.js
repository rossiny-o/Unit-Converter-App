import { useEffect, useState } from "react";
import axios from "axios";
import AreaConvert from "../converters/AreaConvert";

export function Area(props) {
  // for Area
  const [fromArea, setFromArea] = useState();
  const [toArea, setToArea] = useState();
  const [areaAmount, setAreaAmount] = useState(1);
  const [amountInFromArea, setAmountInFromArea] = useState(true);
  const [areaResult, setAreaResult] = useState();

  const [active] = useState("AreaConvert");
  const [areaList] = props;

  let toAreaAmount, fromAreaAmount;
  if (amountInFromArea) {
    fromAreaAmount = areaAmount;
    toAreaAmount = areaAmount * areaResult;
  } else {
    toAreaAmount = areaAmount;
    fromAreaAmount = areaAmount / areaResult;
  }

  function handleAreaFromAmountChange(e) {
    setAreaAmount(e.target.value);
    setAmountInFromArea(true);
  }

  function handleAreaToAmountChange(e) {
    setAreaAmount(e.target.value);
    setAmountInFromArea(false);
  }

  useEffect(() => {
    const areaOptions = {
      method: "GET",
      url: "https://units-converter.p.rapidapi.com/dev/area/allUnits",
      headers: {
        "x-rapidapi-host": "units-converter.p.rapidapi.com",
        "x-rapidapi-key": "23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd",
      },
    };

    axios
      .request(areaOptions)
      .then((response) => {
        const firstArea = response.data[38];
        setFromArea(response.data[28]);
        setToArea(firstArea);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const areaConversion = {
      method: "GET",
      url: "https://units-converter.p.rapidapi.com/dev/area",
      params: {
        convert: `${areaAmount}`,
        from: `${fromArea}`,
        to: `${toArea}`,
      },
      headers: {
        "x-rapidapi-host": "units-converter.p.rapidapi.com",
        "x-rapidapi-key": "23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd",
      },
    };

    //   We can initialize a areaAmount for areaonversion.params.convert
    // We can initialize conversion.params.from into the selected index (by the user) in the array response for line 48 in AreaConvert.js.

    axios
      .request(areaConversion)
      .then(function (response) {
        setAreaResult(response.data.equal);
      })
      .catch(function (error) {
        console.error(error);
      });
  });

  useEffect(() => {
    if (fromArea != null && toArea != null) {
      fetch(
        `https://units-converter.p.rapidapi.com/dev/area?convert=${areaAmount}&from=${fromArea}&to=${toArea}`
      )
        .then((res) => res.json())
        .then((response) =>
          setAreaResult(JSON.stringify(response.data(toArea)))
        );
    }
  }, [fromArea, toArea, areaAmount]);

  if (active === "AreaConvert") {
    return (
      <div className="conversionBox">
        <h2>Area</h2>
        <h4>From: </h4>

        <AreaConvert
          areaList={areaList}
          selectedArea={fromArea}
          onChangeArea={(e) => setFromArea(e.target.value)}
          onChangeAreaAmount={handleAreaFromAmountChange}
          areaAmount={fromAreaAmount}
        />

        <h4>To: </h4>
        <AreaConvert
          areaList={areaList}
          selectedArea={toArea}
          onChangeArea={(e) => setToArea(e.target.value)}
          onChangeAreaAmount={handleAreaToAmountChange}
          areaAmount={toAreaAmount}
        />
      </div>
    );
  }

  // --------------------------------------
}
