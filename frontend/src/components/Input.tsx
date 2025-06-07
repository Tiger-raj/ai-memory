export function Input({ ref, placeholder }: { ref?: React.Ref<HTMLInputElement>; placeholder: string }) {
  return (
    <div>
      <input type="text" ref={ref} placeholder={placeholder} className="border border-gray-300 rounded px-4 py-2 m-2" />
    </div>
  );
}
