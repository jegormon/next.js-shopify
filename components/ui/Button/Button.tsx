import {
  ButtonHTMLAttributes,
  ComponentType,
  FC,
  HTMLAttributes,
  ReactNode,
} from "react";
import s from "./Button.module.css";
import cn from "classnames";
import LoadingDots from "../LoadingDots/LoadingDots";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  Component?: string | ComponentType<HTMLAttributes<HTMLElement>>;
  href?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  isLoading = false,
  Component = "button",

  ...rest
}) => {
  const rootClassName = cn(s.root, className, { [s.loading]: isLoading });

  return (
    <Component type="button" className={rootClassName} {...rest}>
      {children}

      {isLoading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </Component>
  );
};

export default Button;
