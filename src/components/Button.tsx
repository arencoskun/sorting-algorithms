import { ButtonHTMLAttributes } from "react";
import Typography from "./Typography";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
}

export default function Button({ children, ...props }: ButtonProps) {
  const { onClick, ...rest } = props;
  return (
    <button
      className={
        `${
          props.disabled
            ? props.color === "red"
              ? "bg-red-300"
              : props.color === "green"
              ? "bg-green-300"
              : props.color === "yellow"
              ? "bg-yellow-300"
              : "bg-blue-300"
            : props.color === "red"
            ? "bg-red-500 hover:bg-red-700"
            : props.color === "green"
            ? "bg-green-500 hover:bg-green-700"
            : props.color === "yellow"
            ? "bg-yellow-500 hover:bg-yellow-700"
            : "bg-blue-500 hover:bg-blue-700"
        } text-white font-bold py-2 px-4 rounded ` + props.className
      }
      onClick={onClick}
      disabled={props.disabled}
      {...rest}
    >
      <Typography>{children}</Typography>
    </button>
  );
}
