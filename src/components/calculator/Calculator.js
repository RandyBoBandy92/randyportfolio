import { useState } from "react";
import { calculatorButtons } from "../../globals/calculator-button-data.js";
import Screen from "./Screen";
import Button from "./Button";
import History from "./History";
import "./_calculator.scss";
import { evaluate, compile } from "mathjs";

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
        // chop up the calculation statement, I need to grab the last matching regex number at the end of the string:
        // then I need to chop that number off the string, append the the value parameter
        // then append the number back to the string and an enclosing rounded bracket
        const regex = /(\d+)(?!.*\d)/;

        const lastNumber = calculationStatement.match(regex)[0]; // why is [0] the last item in the array?
        const choppedCalculationStatement = calculationStatement.replace(
          regex,
          ""
        );
        debugger;
        setCalculationStatement(
          choppedCalculationStatement + value + lastNumber + ")"
        );
        setCalculationDisplay(calculationDisplay + "\u00b2"); // \u00b2 is the unicode for the superscript 2
        break;
      case "cubed":
        const regex2 = /(\d+)(?!.*\d)/;

        const lastNumber2 = calculationStatement.match(regex2)[0]; // why is [0] the last item in the array?
        const choppedCalculationStatement2 = calculationStatement.replace(
          regex2,
          ""
        );
        debugger;
        setCalculationStatement(
          choppedCalculationStatement2 + value + lastNumber2 + ")"
        );

        // setCalculationStatement(calculationStatement + value);
        setCalculationDisplay(calculationDisplay + "\u00b3"); // \u00b3 is the unicode for the superscript 3
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
    }
    if (customValues) {
      setCalculationDisplay(customValues.display);
      setCalculationStatement(customValues.statement);
    }
  };

  const evaluateCalculation = () => {
    if (calculationStatement) {
      debugger;
      try {
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
