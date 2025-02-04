import { HTMLAttributes } from "react";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

const Header = (props: HeaderProps) => {
  const { title, className } = props;
  return <h1 className={`text-xl font-bold p-b border-b border-slate-300 mb-4 ${className}`}>{title}</h1>;
};

export default Header;
