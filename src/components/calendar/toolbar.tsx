import { ChevronLeft, ChevronRight } from "lucide-react";

// O mapa de traduções para as visualizações
const viewNames: { [key: string]: string } = {
  month: "Mês",
  week: "Semana",
  day: "Dia",
};

interface CustomToolbarProps {
  label: string;
  localizer: {
    messages: {
      today: string;
    };
  };
  onNavigate: (action: string) => void;
  onView: (view: string) => void;
  view: string;
  views: string[];
  addNewEvent: () => void;
}

const CustomToolbar = ({
  label,
  onNavigate,
  onView,
  view,
  views,
}: CustomToolbarProps) => {
  const navigate = (action: string) => {
    onNavigate(action);
  };

  const viewHandler = (viewName: string) => {
    onView(viewName);
  };

  return (
    <div className="rbc-toolbar flex flex-row gap-2 md:gap-0">
      {/* --- Seção Esquerda: Navegação e Ação --- */}
      <div className="flex w-full items-center justify-end md:hidden">
        <span></span>
      </div>
      <div className="flex md:hidden">
        <span className="rbc-btn-group my-2 xl:my-0">
          <button
            type="button"
            style={{ fontSize: "12px", height: "100%" }}
            onClick={() => navigate("TODAY")}
          >
            Hoje
            {/* Usa a tradução ou o nome original */}
          </button>
          {views.map((viewName) => (
            <button
              type="button"
              key={viewName}
              style={{ fontSize: "12px", height: "100%" }}
              className={view === viewName ? "rbc-active" : ""}
              onClick={() => viewHandler(viewName)}
            >
              {viewNames[viewName] || viewName}{" "}
              {/* Usa a tradução ou o nome original */}
            </button>
          ))}
        </span>
      </div>
      <span className="flex w-full flex-row items-center justify-between gap-4 md:w-auto md:justify-start">
        <button
          type="button"
          onClick={() => navigate("PREV")}
          style={{
            backgroundColor: `#d96927`,
            opacity: "0.8",
            color: "white",
          }}
        >
          <ChevronLeft />
        </button>
        <div className="hidden md:block">
          <button
            style={{
              backgroundColor: `#d96927`,
              color: "white",
              opacity: "0.8",
            }}
            type="button"
            onClick={() => navigate("TODAY")}
          >
            Hoje
          </button>
        </div>
        <span className="rbc-toolbar-label text-primary block font-bold capitalize md:hidden">
          {label}
        </span>

        <button
          type="button"
          onClick={() => navigate("NEXT")}
          style={{
            backgroundColor: `#d96927`,
            color: "white",
            opacity: "0.8",
          }}
        >
          <ChevronRight />
        </button>
      </span>

      {/* --- Seção Central: Mês e Ano --- */}
      <span className="rbc-toolbar-label text-primary hidden font-bold capitalize md:block">
        {label}
      </span>

      {/* --- Seção Direita: Seleção de Visualização --- */}
      <div className="hidden md:flex">
        <span className="rbc-btn-group my-2 xl:my-0">
          {views
            .filter((viewName) => viewName !== "agenda")
            .map((viewName, index) => {
              const first = index === 0;
              const last = index === views.length - 2;
              return (
                <button
                  type="button"
                  key={viewName}
                  style={{
                    borderRadius: first
                      ? "0.5rem 0 0 0.5rem"
                      : last
                        ? "0 0.5rem 0.5rem 0"
                        : "",
                    backgroundColor: view !== viewName ? "#fff" : "#d96927",
                    color: view === viewName ? "#fff" : "#d96927",
                    opacity: 1,
                  }}
                  className={view === viewName ? "rbc-active" : ""}
                  onClick={() => viewHandler(viewName)}
                >
                  {viewNames[viewName] || viewName}{" "}
                  {/* Usa a tradução ou o nome original */}
                </button>
              );
            })}
        </span>
      </div>
    </div>
  );
};

export default CustomToolbar;
