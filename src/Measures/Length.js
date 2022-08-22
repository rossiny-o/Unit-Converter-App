import { useEffect, useState } from "react";
import axios from "axios";
import LengthConvert from "../converters/LengthConvert";

export function Length(props) {
  // for length
  const [fromLength, setFromLength] = useState();
  const [toLength, setToLength] = useState();
  const [lengthAmount, setLengthAmount] = useState(1);
  const [amountInFromLength, setAmountInFromLength] = useState(true);
  const [lengthResult, setLengthResult] = useState();

  const [active] = useState("LengthConvert");
  const [lengthList] = props;

  let toLengthAmount, fromLengthAmount;
  if (amountInFromLength) {
    fromLengthAmount = lengthAmount;
    toLengthAmount = lengthAmount * lengthResult;
  } else {
    toLengthAmount = lengthAmount;
    fromLengthAmount = lengthAmount / lengthResult;
  }

  function handleLengthFromAmountChange(e) {
    setLengthAmount(e.target.value);
    setAmountInFromLength(true);
  }

  function handleLengthToAmountChange(e) {
    setLengthAmount(e.target.value);
    setAmountInFromLength(false);
  }

  useEffect(() => {
    const lengthOptions = {
      method: "GET",
      url: "https://units-converter.p.rapidapi.com/dev/length/allUnits",
      headers: {
        "x-rapidapi-host": "units-converter.p.rapidapi.com",
        "x-rapidapi-key": "23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd",
      },
    };

    axios
      .request(lengthOptions)
      .then((response) => {
        const firstLength = response.data[38];
        setFromLength(response.data[28]);
        setToLength(firstLength);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const lengthConversion = {
      method: "GET",
      url: "https://units-converter.p.rapidapi.com/dev/length",
      params: {
        convert: `${lengthAmount}`,
        from: `${fromLength}`,
        to: `${toLength}`,
      },
      headers: {
        "x-rapidapi-host": "units-converter.p.rapidapi.com",
        "x-rapidapi-key": "23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd",
      },
    };

    //   We can initialize a lengthAmount for lengthonversion.params.convert
    // We can initialize conversion.params.from into the selected index (by the user) in the array response for line 48 in LengthConvert.js.

    axios
      .request(lengthConversion)
      .then(function (response) {
        setLengthResult(response.data.equal);
      })
      .catch(function (error) {
        console.error(error);
      });
  });

  useEffect(() => {
    if (fromLength != null && toLength != null) {
      fetch(
        `https://units-converter.p.rapidapi.com/dev/length?convert=${lengthAmount}&from=${fromLength}&to=${toLength}`
      )
        .then((res) => res.json())
        .then((response) =>
          setLengthResult(JSON.stringify(response.data(toLength)))
        );
    }
  }, [fromLength, toLength, lengthAmount]);

  if (active === "LengthConvert") {
    return (
      <div className="conversionBox">
        <h2>Length</h2>
        <h4>From: </h4>

        <LengthConvert
          lengthList={lengthList}
          selectedLength={fromLength}
          onChangeLength={(e) => setFromLength(e.target.value)}
          onChangeLengthAmount={handleLengthFromAmountChange}
          lengthAmount={fromLengthAmount}
        />

        <h4>To: </h4>
        <LengthConvert
          lengthList={lengthList}
          selectedLength={toLength}
          onChangeLength={(e) => setToLength(e.target.value)}
          onChangeLengthAmount={handleLengthToAmountChange}
          lengthAmount={toLengthAmount}
        />
      </div>
    );
  }

  // --------------------------------------
}
