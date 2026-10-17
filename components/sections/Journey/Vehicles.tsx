export default function Vehicles() {
  return (
    <>
      <g className="journey__vehicle">
        <rect x="-9" y="-8" width="4.5" height="2.5" rx="1" fill="#111" />
        <rect x="4" y="-8" width="4.5" height="2.5" rx="1" fill="#111" />
        <rect x="-9" y="5.5" width="4.5" height="2.5" rx="1" fill="#111" />
        <rect x="4" y="5.5" width="4.5" height="2.5" rx="1" fill="#111" />
        <rect x="-11" y="-6.5" width="22" height="13" rx="5" fill="#ff7a2c" />
        <rect x="2" y="-4.8" width="5" height="9.6" rx="1.5" fill="#111" />
        <rect
          x="-8"
          y="-4.5"
          width="3"
          height="9"
          rx="1"
          fill="#111"
          opacity="0.7"
        />
        <circle cx="10.5" cy="-3.5" r="1.1" fill="#fff3c4" />
        <circle cx="10.5" cy="3.5" r="1.1" fill="#fff3c4" />
      </g>

      <g className="journey__vehicle">
        <rect x="-13" y="-10" width="6" height="2.5" rx="1" fill="#111" />
        <rect x="7" y="-10" width="6" height="2.5" rx="1" fill="#111" />
        <rect x="-13" y="7.5" width="6" height="2.5" rx="1" fill="#111" />
        <rect x="7" y="7.5" width="6" height="2.5" rx="1" fill="#111" />
        <rect x="-17" y="-8" width="34" height="16" rx="5" fill="#111" />
        <rect x="-10" y="-6" width="15" height="12" rx="2" fill="#ff7a2c" />
        <path d="M-8 -3 H3 M-8 0 H3 M-8 3 H3" stroke="#111" strokeWidth="1" />
        <rect x="7" y="-6" width="5" height="12" rx="1.5" fill="#555" />
        <circle cx="16" cy="-5" r="1.3" fill="#fff3c4" />
        <circle cx="16" cy="5" r="1.3" fill="#fff3c4" />
      </g>

      <g className="journey__vehicle">
        <rect x="-28" y="-12" width="6" height="2.5" rx="1" fill="#111" />
        <rect x="-18" y="-12" width="6" height="2.5" rx="1" fill="#111" />
        <rect x="-28" y="9.5" width="6" height="2.5" rx="1" fill="#111" />
        <rect x="-18" y="9.5" width="6" height="2.5" rx="1" fill="#111" />
        <rect x="13" y="-12" width="6" height="2.5" rx="1" fill="#111" />
        <rect x="13" y="9.5" width="6" height="2.5" rx="1" fill="#111" />
        <rect
          x="-33"
          y="-10"
          width="38"
          height="20"
          rx="2"
          fill="#fbf8f2"
          stroke="#111"
          strokeWidth="1.5"
        />
        <rect x="-33" y="-2" width="38" height="4" fill="#ff7a2c" />
        <rect x="5" y="-3" width="4" height="6" fill="#111" />
        <rect
          x="9"
          y="-9"
          width="15"
          height="18"
          rx="3"
          fill="#ff7a2c"
          stroke="#111"
          strokeWidth="1.2"
        />
        <rect x="18.5" y="-7" width="3.5" height="14" rx="1" fill="#111" />
        <circle cx="23" cy="-6" r="1.3" fill="#fff3c4" />
        <circle cx="23" cy="6" r="1.3" fill="#fff3c4" />
      </g>

      <g className="journey__vehicle">
        <g className="journey__flame">
          <path d="M-15 -5 Q-34 0 -15 5 Z" fill="#ff7a2c" />
          <path d="M-15 -2.6 Q-25 0 -15 2.6 Z" fill="#ffd36b" />
        </g>
        <path
          d="M-11 -6 L-20 -14 L-5 -6 Z M-11 6 L-20 14 L-5 6 Z"
          fill="#ff7a2c"
          stroke="#111"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M-16 -7 L8 -7 Q22 0 8 7 L-16 7 Z"
          fill="#fbf8f2"
          stroke="#111"
          strokeWidth="1.5"
        />
        <path
          d="M8 -7 Q22 0 8 7 Z"
          fill="#ff7a2c"
          stroke="#111"
          strokeWidth="1.2"
        />
        <circle
          cx="-1"
          cy="0"
          r="3.4"
          fill="#111"
          stroke="#ff7a2c"
          strokeWidth="1.2"
        />
      </g>
    </>
  );
}
