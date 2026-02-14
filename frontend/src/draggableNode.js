
// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };

    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      style={{
        cursor: "grab",
        minWidth: "90px",
        height: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 14px",
        borderRadius: "10px",
        border: "1px solid #d0d0d0",
        background: "#111827",
        color: "white",
        fontWeight: 600,
        userSelect: "none",
      }}
    >
      {label}
    </div>
  );
};




