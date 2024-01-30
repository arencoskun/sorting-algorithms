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
            ? `bg-${props.color}-300`
            : `bg-${props.color}-500 hover:bg-${props.color}-700`
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
