export default function ToggleDarkMode() {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={toggleDarkMode}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Mode Ligth / Dark
      </button>
    </div>
  );
}
