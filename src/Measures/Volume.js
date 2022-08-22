import { useEffect, useState } from "react";
import axios from "axios";
import VolConvert from "../converters/VolConvert";

export function Vol(props) {
  // for Vol
  const [fromVol, setFromVol] = useState();
  const [toVol, setToVol] = useState();
  const [volAmount, setVolAmount] = useState(1);
  const [amountInFromVol, setAmountInFromVol] = useState(true);
  const [volResult, setVolResult] = useState();

  const [active] = useState("VolConvert");
  const [volList] = props;

  let toVolAmount, fromVolAmount;
  if (amountInFromVol) {
    fromVolAmount = volAmount;
    toVolAmount = volAmount * volResult;
  } else {
    toVolAmount = volAmount;
    fromVolAmount = volAmount / volResult;
  }

  function handleVolFromAmountChange(e) {
    setVolAmount(e.target.value);
    setAmountInFromVol(true);
  }

  function handleVolToAmountChange(e) {
    setVolAmount(e.target.value);
    setAmountInFromVol(false);
  }

  useEffect(() => {
    const volOptions = {
      method: "GET",
      url: "https://units-converter.p.rapidapi.com/dev/volume/allUnits",
      headers: {
        "x-rapidapi-host": "units-converter.p.rapidapi.com",
        "x-rapidapi-key": "23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd",
      },
    };

    axios
      .request(volOptions)
      .then((response) => {
        const firstVol = response.data[61];
        setFromVol(response.data[29]);
        setToVol(firstVol);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const volConversion = {
      method: "GET",
      url: "https://units-converter.p.rapidapi.com/dev/volume",
      params: {
        convert: `${volAmount}`,
        from: `${fromVol}`,
        to: `${toVol}`,
      },
      headers: {
        "x-rapidapi-host": "units-converter.p.rapidapi.com",
        "x-rapidapi-key": "23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd",
      },
    };

    //   We can initialize a volAmount for volonversion.params.convert
    // We can initialize conversion.params.from into the selected index (by the user) in the array response for line 48 in VolConvert.js.

    axios
      .request(volConversion)
      .then(function (response) {
        setVolResult(response.data.equal);
      })
      .catch(function (error) {
        console.error(error);
      });
  });

  useEffect(() => {
    if (fromVol != null && toVol != null) {
      fetch(
        `https://units-converter.p.rapidapi.com/dev/volume?convert=${volAmount}&from=${fromVol}&to=${toVol}`
      )
        .then((res) => res.json())
        .then((response) =>
          setVolResult(JSON.stringify(response.data(toVol)))
        );
    }
  }, [fromVol, toVol, volAmount]);

  if (active === "VolConvert") {
    return (
      <div className="conversionBox">
        <h2>Vol</h2>
        <h4>From: </h4>

        <VolConvert
          volList={volList}
          selectedVol={fromVol}
          onChangeVol={(e) => setFromVol(e.target.value)}
          onChangeVolAmount={handleVolFromAmountChange}
          volAmount={fromVolAmount}
        />

        <h4>To: </h4>
        <VolConvert
          volList={volList}
          selectedVol={toVol}
          onChangeVol={(e) => setToVol(e.target.value)}
          onChangeVolAmount={handleVolToAmountChange}
          volAmount={toVolAmount}
        />
      </div>
    );
  }

  // --------------------------------------
}
