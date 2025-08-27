
function ListButtons({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "to-read", label: "To Read" },
    { id: "recommendations", label: "Recommendations" },
    { id: "favs", label: "Favorites" },
    { id: "finished", label: "Finished" },
  ];

  return (
    <nav className="flex justify-center w-full px-4">
      <ul className="flex items-center gap-2 p-1 overflow-x-auto whitespace-nowrap hide-scrollbar">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                ${
                  activeTab === tab.id
                    ? "bg-pink-500 text-white shadow-md" 
                    : "bg-gray-100 text-slate-600 hover:bg-gray-200" 
                }
              `}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ListButtons;

