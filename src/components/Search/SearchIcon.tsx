import * as React from "react";

function SearchIcon(props: any) {
  return (
    <svg width={30} height={30} viewBox="0 0 172 172" {...props}>
      <g
        fill="none"
        strokeMiterlimit={10}
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={{
          mixBlendMode: "normal",
        }}
      >
        <path d="M0 172V0h172v172z" />
        <path
          d="M64.5 14.333c-27.621 0-50.167 22.546-50.167 50.167 0 27.621 22.546 50.167 50.167 50.167 12.527 0 23.973-4.673 32.782-12.318l3.051 3.051v9.267l43 43 14.334-14.334-43-43H105.4l-3.051-3.051c7.645-8.81 12.318-20.255 12.318-32.782 0-27.621-22.546-50.167-50.167-50.167zm0 14.334A35.725 35.725 0 01100.333 64.5 35.725 35.725 0 0164.5 100.333 35.725 35.725 0 0128.667 64.5 35.725 35.725 0 0164.5 28.667z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

export default SearchIcon;
