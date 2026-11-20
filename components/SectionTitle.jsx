export default function SectionTitle({ title, text, center = false }) {
  return (
    <div className={center ? "mx-auto text-center" : ""}>
      <h2 className="page-title">{title}</h2>
      {text && <p className={`mt-3 max-w-2xl text-base-content/70 ${center ? "mx-auto" : ""}`}>{text}</p>}
    </div>
  );
}
