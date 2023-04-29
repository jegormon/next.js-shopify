import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import s from "./Button.module.css";
import cn from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button type="button" className={cn(s.root, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
