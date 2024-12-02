const EventsHome = () => {
  const years = ["2018", "2019", "2020", "2021", "2022", "2023", "2024",
    "2021", "2022", "2023", "2024",
  ];

  const pallette=[
    "#6699ff","#737dfe","#cb5eee",
    "#fa7cbb","#f14658", "#4be1ec",
    "#f40076", "#df98fa","#f06966",
    "#e233ff","#ff6b00","#df98fa",
    "#9055ff","#ed7b84","#9055ff",
    "#402565","#30be96","#402662",
    "#3900a6","#f14658","#dc2537",
    "#fad6a6","#ff0076","#590fb7",
    "#9055ff","#13e2da","#0b63f6",
    "#003cc5","#d6ff7f","#00b3cc",
    "#f40076","#342711","#000066",
    "#ffcac9","#2f80ed","#b2ffda"
]
  const getPalletteColor= (index: number) => {
    return pallette[index];
  }
  return (
    <div className="flex flex-col p-6 gap-4">
      <div className="text-white">Buttons Section</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {years.map((year, index) => {
          const randomColor = getPalletteColor(index);
          return (
            <div className="flex flex-col gap-4" key={index}>
              <div
                style={{ background: `linear-gradient(to bottom right, ${randomColor}, #FFFFFF66)` }}
                className="flex rounded p-2 justify-end text-lg font-semibold"
              >
                {year}
              </div>
              <div className="rounded-lg"
              style={{  background: `linear-gradient(to bottom right, ${randomColor}, #FFFFFF1A)` }}>
                <div className="flex flex-col gap-2 p-4 rounded-lg">
                  <div className="bg-white/15 shadow-lg backdrop-blur-md p-4 rounded-lg cursor-pointer">Tile One</div>
                  <div className="bg-white/15 shadow-lg backdrop-blur-md p-4 rounded-lg cursor-pointer">Tile One</div>
                  <div className="bg-white/15 shadow-lg backdrop-blur-md p-4 rounded-lg cursor-pointer">Tile One</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsHome;
