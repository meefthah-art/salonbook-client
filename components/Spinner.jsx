export default function Spinner({ text = "Loading" }) {
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status">
      <div className="flex flex-col items-center gap-3">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-sm text-base-content/60">{text}...</p>
      </div>
    </div>
  );
}
