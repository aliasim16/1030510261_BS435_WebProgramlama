export default function ImageOption({ image, onClick, isDisabled, isSelected }) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`
        card p-2 shadow border-2
        ${isSelected ? "border-success" : "border-light"}
        hover:scale-105 transition-transform
      `}
      style={{
        width: "360px",
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
    >
      <img
        src={image.url}
        alt={image.id}
        className="card-img-top rounded"
        style={{
          height: "260px",
          objectFit: "cover",
        }}
      />
    </button>
  );
}
