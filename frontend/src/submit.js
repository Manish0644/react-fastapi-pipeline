// submit.js



import { useStore } from "./store";

export const SubmitButton = () => {

  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nodes, edges }),
    });

    const data = await response.json();
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

