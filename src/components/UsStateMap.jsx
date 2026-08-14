import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { usStatesTopoJson, fipsToAbbr } from "@/lib/usStatesGeo";

/* Literal hex because react-simple-maps needs resolved colors in its style
   objects, not CSS vars. These mirror the tokens in index.css:
   REST = neutral surface, WASH = accent at 22%, PICK = the accent itself.
   Selection is the one place on this page the accent is spent. */
const REST = "#E9EBF0";
const WASH = "#C5C2F5";
const PICK = "#4F46E5";
const SEAM = "#FFFFFF";

export default function UsStateMap({ selectedState, onSelectState }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="relative w-full">
      <ComposableMap projection="geoAlbersUsa" className="w-full h-auto">
        <Geographies geography={usStatesTopoJson}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const abbr = fipsToAbbr[geo.id];
              const isSelected = abbr === selectedState;
              const isHovered = abbr === hovered;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHovered(abbr)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => abbr && onSelectState(isSelected ? null : abbr)}
                  style={{
                    default: {
                      fill: isSelected ? PICK : REST,
                      stroke: SEAM,
                      strokeWidth: 0.75,
                      outline: "none",
                      transition: "fill 160ms cubic-bezier(0.16, 1, 0.3, 1)",
                      cursor: abbr ? "pointer" : "default",
                    },
                    hover: {
                      fill: isSelected ? PICK : WASH,
                      stroke: SEAM,
                      strokeWidth: 0.75,
                      outline: "none",
                      cursor: abbr ? "pointer" : "default",
                    },
                    pressed: {
                      fill: PICK,
                      stroke: SEAM,
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {hovered && (
        <div className="type-label pointer-events-none absolute left-3 top-3 rounded-md bg-foreground px-2.5 py-1.5 text-background">
          {hovered}
        </div>
      )}
    </div>
  );
}
