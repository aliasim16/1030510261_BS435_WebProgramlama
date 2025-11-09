export default function StartScreen({ onStart }) {
  return (
    <section className="screen">
      <h1>Yapay zeka ile hazırlanmış görseli bul</h1>
      <p>Karşına çıkacak 3 görselden biri yapay zekâ tarafından üretildi. Hangisi olduğunu tahmin et!</p>
      <ul>
        <li>İlk tahminin yanlışsa ipucu gelecek.</li>
        <li>Sonra ikinci şans hakkın var.</li>
      </ul>
      <button onClick={onStart}>Başla</button>
    </section>
  );
}
