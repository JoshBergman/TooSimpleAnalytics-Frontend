interface IHeaderProps {
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setIsDarkMode }: IHeaderProps) => {
  return (
    <div>
      Header
      <button
        onClick={() => {
          setIsDarkMode((prevState) => !prevState);
        }}
      >
        Toggle Dark
      </button>
    </div>
  );
};

export default Header;
