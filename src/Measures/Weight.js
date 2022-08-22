import { useEffect, useState } from "react";
import axios from "axios";
import WeightConvert from "../converters/WeightConvert";

export function Weight(props) {
  // for weight
  const [fromWeight, setFromWeight] = useState();
  const [toWeight, setToWeight] = useState();
  const [weightAmount, setWeightAmount] = useState(1);
  const [amountInFromWeight, setAmountInFromWeight] = useState(true);
  const [weightResult, setWeightResult] = useState();

  const [active] = useState("WeightConvert");
  const [weightList] = props;

  let toWeightAmount, fromWeightAmount;
  if (amountInFromWeight) {
    fromWeightAmount = weightAmount;
    toWeightAmount = weightAmount * weightResult;
  } else {
    toWeightAmount = weightAmount;
    fromWeightAmount = weightAmount / weightResult;
  }

  function handleWeightFromAmountChange(e) {
    setWeightAmount(e.target.value);
    setAmountInFromWeight(true);
  }

  function handleWeightToAmountChange(e) {
    setWeightAmount(e.target.value);
    setAmountInFromWeight(false);
  }

  useEffect(() => {
    const weightOptions = {
      method: "GET",
      url: "https://units-converter.p.rapidapi.com/dev/weight/allUnits",
      headers: {
        "x-rapidapi-host": "units-converter.p.rapidapi.com",
        "x-rapidapi-key": "23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd",
      },
    };

    axios
      .request(weightOptions)
      .then((response) => {
        const firstWeight = response.data[18];
        setFromWeight(response.data[29]);
        setToWeight(firstWeight);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const weightConversion = {
      method: "GET",
      url: "https://units-converter.p.rapidapi.com/dev/weight",
      params: {
        convert: `${weightAmount}`,
        from: `${fromWeight}`,
        to: `${toWeight}`,
      },
      headers: {
        "x-rapidapi-host": "units-converter.p.rapidapi.com",
        "x-rapidapi-key": "23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd",
      },
    };

    //   We can initialize a weightAmount for weightonversion.params.convert
    // We can initialize conversion.params.from into the selected index (by the user) in the array response for line 48 in WeightConvert.js.

    axios
      .request(weightConversion)
      .then(function (response) {
        setWeightResult(response.data.equal);
      })
      .catch(function (error) {
        console.error(error);
      });
  });

  useEffect(() => {
    if (fromWeight != null && toWeight != null) {
      fetch(
        `https://units-converter.p.rapidapi.com/dev/weight?convert=${weightAmount}&from=${fromWeight}&to=${toWeight}`
      )
        .then((res) => res.json())
        .then((response) =>
          setWeightResult(JSON.stringify(response.data(toWeight)))
        );
    }
  }, [fromWeight, toWeight, weightAmount]);

  if (active === "WeightConvert") {
    return (
      <div className="conversionBox">
        <h2>Weight</h2>
        <h4>From: </h4>

        <WeightConvert
          weightList={weightList}
          selectedWeight={fromWeight}
          onChangeWeight={(e) => setFromWeight(e.target.value)}
          onChangeWeightAmount={handleWeightFromAmountChange}
          WeightAmount={fromWeightAmount}
        />

        <h4>To: </h4>
        <WeightConvert
          weightList={weightList}
          selectedWeight={toWeight}
          onChangeWeight={(e) => setToWeight(e.target.value)}
          onChangeWeightAmount={handleWeightToAmountChange}
          weightAmount={toWeightAmount}
        />
      </div>
    );
  }

  // --------------------------------------
}
