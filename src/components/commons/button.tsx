import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outlined" | "filled";
}

const Button = (props: ButtonProps) => {
  const { variant = "outlined", className } = props;
  const styledButton = (variant: ButtonProps["variant"]) => {
    switch (variant) {
      case "outlined":
        return "border border-primary hover:bg-primary/10 active:bg-primary/20 transition-colors";
      case "filled":
        return "bg-primary text-white";
    }
  };
  return (
    <button
      {...props}
      className={`${styledButton(
        variant
      )}  p-3 rounded-sm shadow-md active:shadow-none select-none ${className}`}
    />
  );
};

export default Button;
