export default function InputForm({ type = "text", name, placeholder }) {
  return (
    <div className="w-80 mb-2">
      <input
        type={type}
        name={name}
        className="w-full bg-btn outline-none px-2.5 py-1.5 rounded-sm"
        placeholder={placeholder}
      />
    </div>
  );
}
