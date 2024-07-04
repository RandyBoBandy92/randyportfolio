import { useState } from "react";
import { calculatorButtons } from "../../globals/calculator-button-data.js";
import Screen from "./Screen.jsx";
import Button from "./Button.jsx";
import History from "./History.jsx";
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
      case "square": {
        const regex = /(\d+)(?!.*\d)/;
        const lastNumber = calculationStatement.match(regex)[0];
        const choppedCalculationStatement = calculationStatement.replace(
          regex,
          ""
        );
        setCalculationStatement(
          choppedCalculationStatement + value + lastNumber + ")"
        );
        setCalculationDisplay(calculationDisplay + "\u00b2");
        break;
      }
      case "cubed": {
        const regex2 = /(\d+)(?!.*\d)/;
        const lastNumber2 = calculationStatement.match(regex2)[0];
        const choppedCalculationStatement2 = calculationStatement.replace(
          regex2,
          ""
        );
        setCalculationStatement(
          choppedCalculationStatement2 + value + lastNumber2 + ")"
        );
        setCalculationDisplay(calculationDisplay + "\u00b3");
        break;
      }
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
    }
    if (customValues) {
      setCalculationDisplay(customValues.display);
      setCalculationStatement(customValues.statement);
    }
  };

  const evaluateCalculation = async () => {
    if (calculationStatement) {
      try {
        // Lazy load the compile function from mathjs
        const { compile } = await import("mathjs");
        const calculationResult = compile(calculationStatement).evaluate();
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
        console.error(error);
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
