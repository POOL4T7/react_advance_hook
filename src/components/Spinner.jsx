const Spinner = () => {
  return (
    <div
      className="spinner-border"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "flex",
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
