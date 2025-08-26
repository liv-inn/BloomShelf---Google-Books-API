function ListButtons({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "search", label: "Search" },
    { id: "to-read", label: "To-read" },
    { id: "recommendations", label: "Recommendations" },
    { id: "favs", label: "Favorites" },
    { id: "finished", label: "Finished" },
  ];

  return (
    <nav className="flex justify-center gap-4 p-1 overflow-x-auto hide-scrollbar w-full">
      <ul className="flex gap-2">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`p-2 rounded-lg w-fit h-10 text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-[#ff1ca8d3] text-[#ffffff]"
                  : "bg-[#f7f7f7] text-[#706f6f] hover:bg-[#e0e0e0]"
              }`}
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