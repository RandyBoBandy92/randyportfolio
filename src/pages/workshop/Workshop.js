import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DummyComponentOne = () => {
  return <h1>I am component 1</h1>;
};

const DummyComponentTwo = () => {
  return <h1>I am component 2</h1>;
};

const WorkShop = () => {
  const [input, setInput] = useState("");
  const [apps, setApps] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const testFunc = () => {
    // setSearchParams({ test: [1, 2, 3] });
  };
  const app = searchParams.getAll("app");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const addComponent = () => {
    app.push(input);
    setSearchParams({ app });
  };

  const delComponent = () => {
    const newApp = app.filter((application) => application !== input);
    setSearchParams({ app: newApp });
  };

  useEffect(() => {
    // every time search params is updated, we loop over the contents of app
    const appsToLaunch = [];
    app.forEach((application, index) => {
      if (application === "dummy1") {
        appsToLaunch.push(<DummyComponentOne key={index} />);
      }
      if (application === "dummy2") {
        appsToLaunch.push(<DummyComponentTwo key={index} />);
      }
    });
    setApps(appsToLaunch);
  }, [searchParams]);

  return (
    <div>
      <h1>Welcome to the workshop</h1>
      <button onClick={testFunc}>click</button>
      <div>
        <input type="text" value={input} onChange={handleChange} />
        <button onClick={addComponent}>add component with this value</button>
        <button onClick={delComponent}>delete component with this value</button>
      </div>
      {apps.length > 0 && <div className="apps">{apps}</div>}
    </div>
  );
};

export default WorkShop;
