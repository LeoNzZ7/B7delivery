type Props = {
  color: string;
}

export const Email = ({ color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="109"
      height="109"
      fill="none"
      viewBox="0 0 109 109"
    >
      <path
        fill={color}
        d="M99.917 90.865a4.541 4.541 0 01-4.506 4.51H13.59a4.51 4.51 0 01-4.506-4.51v-4.573h81.75V33.154L54.5 65.854 9.083 24.98v-6.812a4.542 4.542 0 014.542-4.542h81.75a4.542 4.542 0 014.542 4.542v72.698zm-79.78-68.157L54.5 53.638l34.362-30.93H20.138zM0 68.125h36.333v9.083H0v-9.083zm0-22.708h22.708V54.5H0v-9.083z"
      ></path>
    </svg>
  );
}