import { useEffect, useState } from "react";
import axios from "axios";
import TimeConvert from "../converters/TimeConvert";

export function Time(props) {
  // for Time
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [timeAmount, setTimeAmount] = useState(1);
  const [amountInFromTime, setAmountInFromTime] = useState(true);
  const [timeResult, setTimeResult] = useState();

  const [active] = useState("TimeConvert");
  const [timeList] = props;

  let toTimeAmount, fromTimeAmount;
  if (amountInFromTime) {
    fromTimeAmount = timeAmount;
    toTimeAmount = timeAmount * timeResult;
  } else {
    toTimeAmount = timeAmount;
    fromTimeAmount = timeAmount / timeResult;
  }

  function handleTimeFromAmountChange(e) {
    setTimeAmount(e.target.value);
    setAmountInFromTime(true);
  }

  function handleTimeToAmountChange(e) {
    setTimeAmount(e.target.value);
    setAmountInFromTime(false);
  }

  useEffect(() => {
    const timeOptions = {
      method: "GET",
      url: "https://units-converter.p.rapidapi.com/dev/time/allUnits",
      headers: {
        "x-rapidapi-host": "units-converter.p.rapidapi.com",
        "x-rapidapi-key": "23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd",
      },
    };

    axios
      .request(timeOptions)
      .then((response) => {
        const firstTime = response.data[29];
        setFromTime(response.data[9]);
        setToTime(firstTime);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const timeConversion = {
      method: "GET",
      url: "https://units-converter.p.rapidapi.com/dev/time",
      params: {
        convert: `${timeAmount}`,
        from: `${fromTime}`,
        to: `${toTime}`,
      },
      headers: {
        "x-rapidapi-host": "units-converter.p.rapidapi.com",
        "x-rapidapi-key": "23db05a3b5mshf6cd348a653765bp13010djsn41b57b8068dd",
      },
    };

    //   We can initialize a timeAmount for timeonversion.params.convert
    // We can initialize conversion.params.from into the selected index (by the user) in the array response for line 48 in TimeConvert.js.

    axios
      .request(timeConversion)
      .then(function (response) {
        setTimeResult(response.data.equal);
      })
      .catch(function (error) {
        console.error(error);
      });
  });

  useEffect(() => {
    if (fromTime != null && toTime != null) {
      fetch(
        `https://units-converter.p.rapidapi.com/dev/time?convert=${timeAmount}&from=${fromTime}&to=${toTime}`
      )
        .then((res) => res.json())
        .then((response) =>
          setTimeResult(JSON.stringify(response.data(toTime)))
        );
    }
  }, [fromTime, toTime, timeAmount]);

  if (active === "TimeConvert") {
    return (
      <div className="conversionBox">
        <h2>Time</h2>
        <h4>From: </h4>

        <TimeConvert
          timeList={timeList}
          selectedTime={fromTime}
          onChangeTime={(e) => setFromTime(e.target.value)}
          onChangeTimeAmount={handleTimeFromAmountChange}
          timeAmount={fromTimeAmount}
        />

        <h4>To: </h4>
        <TimeConvert
          timeList={timeList}
          selectedTime={toTime}
          onChangeTime={(e) => setToTime(e.target.value)}
          onChangeTimeAmount={handleTimeToAmountChange}
          timeAmount={toTimeAmount}
        />
      </div>
    );
  }

  // --------------------------------------
}
