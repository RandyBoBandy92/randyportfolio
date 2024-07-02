import "./_buttons.scss";
export default function Button({
  appendCalculation,
  buttonClass,
  text,
  type,
  value,
}) {
  return (
    <button
      onClick={() => appendCalculation(value, text, buttonClass)}
      className={`${type} ${buttonClass}`} style={{gridArea: buttonClass}}
    >
      {text}
    </button>
  );
}
