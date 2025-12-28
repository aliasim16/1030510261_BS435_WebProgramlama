export default function PageWrapper({ children }) {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      {children}
    </div>
  );
}
