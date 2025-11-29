// Basit bir görsel kutusu: tıklanabilir kart.

export default function ImageOption({ image, onClick, isDisabled, isSelected }) {
  const borderStyle = isSelected ? "3px solid #4CAF50" : "2px solid #ccc";
  const opacity = isDisabled ? 0.5 : 1;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{
        border: borderStyle,
        borderRadius: "8px",
        padding: "4px",
        margin: "8px",
        backgroundColor: "white",
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
    >
      <img
        src={image.url}
        alt={image.id}
        style={{ width: "260px", height: "180px", objectFit: "cover", opacity }}
      />
    </button>
  );
}
