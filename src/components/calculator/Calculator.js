import { useState } from "react";
import { calculatorButtons } from "../../globals/calculator-button-data.js";
import Screen from "./Screen";
import Button from "./Button";
import History from "./History";
import "./_calculator.scss";

export default function Calculator() {
  const [calculationStatement, setCalculationStatement] = useState("");
  const [calculationDisplay, setCalculationDisplay] = useState("");
  const [history, setHistory] = useState([]);

  const appendCalculation = (value, text, buttonClass) => {
    switch (buttonClass) {
      case "square-root":
        setCalculationStatement(calculationStatement + value);
        setCalculationDisplay(calculationDisplay + `${text}(`);
        break;
      case "square":
        setCalculationStatement(calculationStatement + value);
        setCalculationDisplay(calculationDisplay + "\u00b2");
        break;
      case "cubed":
        setCalculationStatement(calculationStatement + value);
        setCalculationDisplay(calculationDisplay + "\u00b3");
        break;
      case "inverse":
        setCalculationStatement(calculationStatement + value);
        setCalculationDisplay(calculationDisplay + value);
        break;
      case "ac":
        resetCalculations();
        break;
      case "equal":
        evaluateCalculation();
        break;
      default:
        setCalculationStatement(calculationStatement + value);
        setCalculationDisplay(calculationDisplay + text);
        break;
    }
  };

  const resetCalculations = (error = false, customValues = "") => {
    setCalculationStatement("");
    setCalculationDisplay("");
    if (error) {
      setCalculationDisplay(`ERR`);
      console.log(error);
    }
    if (customValues) {
      setCalculationDisplay(customValues.display);
      setCalculationStatement(customValues.statement);
    }
  };

  const evaluateCalculation = () => {
    console.log(calculationStatement);
    if (calculationStatement) {
      try {
        const sanitizedCalculations = calculationStatement.replace(
          /[^-()\d/*+.Mathsqr]/g,
          ""
        );
        console.log(sanitizedCalculations);
        // eslint-disable-next-line
        const calculationResult = eval(sanitizedCalculations);
        console.log(calculationResult);
        if (!isFinite(calculationResult)) {
          setCalculationStatement("");
          setCalculationDisplay("u can't do that lol");
        } else {
          setHistory([
            ...history,
            {
              statement: calculationStatement,
              result: calculationResult,
              display: calculationDisplay,
            },
          ]);
          setCalculationStatement(String(calculationResult));
          setCalculationDisplay(String(calculationResult));
        }
      } catch (error) {
        resetCalculations(error);
      }
    }
  };

  return (
    <div className="calculator">
      <History resetCalculations={resetCalculations} history={history} />
      <Screen calculationDisplay={calculationDisplay} />
      <div className="buttons">
        {calculatorButtons.map((buttonData, i) => (
          <Button
            key={i}
            buttonClass={buttonData.className}
            text={buttonData.text}
            type={buttonData.type}
            value={buttonData.value}
            appendCalculation={appendCalculation}
          />
        ))}
      </div>
    </div>
  );
}
