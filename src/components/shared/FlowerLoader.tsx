export default function FlowerLoader({ size = 120 }: { size?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
      <svg width={size} height={size} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          .outer{fill:none;stroke:#8B8400;stroke-width:8;stroke-dasharray:700;stroke-dashoffset:700;animation:ring 2s ease forwards;}
          .flower{transform-origin:center;animation:rotate 8s linear infinite;}
          .petal{fill:#AEB48B;transform-origin:center;animation:bloom 2s ease infinite alternate;}
          .petal-light{fill:#F6EBC6;opacity:.7;transform-origin:center;animation:bloom2 2s ease infinite alternate;}
          .center{fill:#F9F6EE;animation:pulse 1.8s ease infinite;}
          .stem{fill:none;stroke:#8B8400;stroke-width:7;stroke-linecap:round;stroke-dasharray:120;stroke-dashoffset:120;animation:grow 1.5s ease forwards;}
          .bud{fill:#8B8400;animation:pulse 2s ease infinite;}
          .stamen{stroke:#F8F2D8;stroke-width:2;stroke-linecap:round;animation:fade 2s ease infinite;}
          @keyframes ring{to{stroke-dashoffset:0;}}
          @keyframes grow{to{stroke-dashoffset:0;}}
          @keyframes bloom{from{transform:scale(.85);}to{transform:scale(1);}}
          @keyframes bloom2{from{transform:scale(.9);opacity:.4;}to{transform:scale(1);opacity:.7;}}
          @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.12);}}
          @keyframes rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
          @keyframes fade{0%,100%{opacity:.5;}50%{opacity:1;}}
        `}</style>
        <circle className="outer" cx="150" cy="150" r="118"/>
        <path className="stem" d="M150 220 C148 205 148 185 150 165"/>
        <path className="bud" d="M150 165 c-12-10-12-25 0-35 c12 10 12 25 0 35z"/>
        <g className="flower">
          <g className="petal-light">
            <ellipse cx="150" cy="110" rx="20" ry="38"/>
            <ellipse cx="188" cy="128" rx="20" ry="38" transform="rotate(45 188 128)"/>
            <ellipse cx="188" cy="172" rx="20" ry="38" transform="rotate(90 188 172)"/>
            <ellipse cx="112" cy="172" rx="20" ry="38" transform="rotate(-90 112 172)"/>
            <ellipse cx="112" cy="128" rx="20" ry="38" transform="rotate(-45 112 128)"/>
          </g>
          <g className="petal">
            <ellipse cx="150" cy="120" rx="22" ry="42"/>
            <ellipse cx="185" cy="138" rx="22" ry="42" transform="rotate(45 185 138)"/>
            <ellipse cx="185" cy="162" rx="22" ry="42" transform="rotate(90 185 162)"/>
            <ellipse cx="115" cy="162" rx="22" ry="42" transform="rotate(-90 115 162)"/>
            <ellipse cx="115" cy="138" rx="22" ry="42" transform="rotate(-45 115 138)"/>
          </g>
          <g className="stamen">
            <line x1="150" y1="150" x2="150" y2="125"/>
            <line x1="150" y1="150" x2="170" y2="132"/>
            <line x1="150" y1="150" x2="130" y2="132"/>
            <line x1="150" y1="150" x2="175" y2="150"/>
            <line x1="150" y1="150" x2="125" y2="150"/>
            <circle cx="150" cy="125" r="3"/>
            <circle cx="170" cy="132" r="3"/>
            <circle cx="130" cy="132" r="3"/>
            <circle cx="175" cy="150" r="3"/>
            <circle cx="125" cy="150" r="3"/>
          </g>
          <circle className="center" cx="150" cy="150" r="12"/>
        </g>
      </svg>
    </div>
  );
}
