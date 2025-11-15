export default function StartScreen() {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>AI Guess Game</h1>
      <p>Gerçek ve yapay görselleri ayırt etme oyununa hoş geldin!</p>

      <a href="/game">
        <button style={{ padding: "10px 20px", marginTop: "20px" }}>
          Başla
        </button>
      </a>
    </div>
  );
}