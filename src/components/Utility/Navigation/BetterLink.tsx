import { useNavigate } from "react-router-dom";

interface IBetterLinkProps {
  to: string;
  children: React.ReactNode;
}

const BetterLink = ({ to, children }: IBetterLinkProps) => {
  const nav = useNavigate();
  const onClickHandler = () => {
    nav(to);
  };

  return <button onClick={onClickHandler}>{children}</button>;
};

export default BetterLink;
