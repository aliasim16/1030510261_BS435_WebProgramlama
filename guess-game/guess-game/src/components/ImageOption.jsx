export default function ImageOption({ image, onClick, isDisabled, isSelected }) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`
        card p-1 shadow-sm border-2
        ${isSelected ? "border-success" : "border-light"}
        hover:scale-105 transition-transform
      `}
      style={{ width: "270px" }}
    >
      <img
        src={image.url}
        alt={image.id}
        className="card-img-top rounded"
        style={{ height: "180px", objectFit: "cover" }}
      />
    </button>
  );
}
