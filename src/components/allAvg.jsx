
 function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      viewBox="0 0 30 30"
    >
      <path fill="#fff" d="M3 7a1 1 0 100 2h24a1 1 0 100-2H3zm0 7a1 1 0 100 2h24a1 1 0 100-2H3zm0 7a1 1 0 100 2h24a1 1 0 100-2H3z"></path>
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5rem"
      height="1.5rem"
      fill="white"
      stroke="white"
      strokeWidth="0"
      viewBox="0 0 24 24"
    >
      <g stroke="none">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"></path>
      </g>
    </svg>
  );
}




function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5rem"
      height="1.5rem"
      fill="white"
      stroke="white"
      strokeWidth="0"
      className="h-6 w-6 translate-x-[2px] text-white"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"></path>
    </svg>
  );
}

export {
  MenuIcon,
  ArrowRight,
  ArrowLeft
}