interface IHeaderProps {
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setIsDarkMode }: IHeaderProps) => {
  const toggleDark = () => {
    setIsDarkMode((existing_is_dark) => {
      const new_is_dark = !existing_is_dark;

      localStorage.setItem("theme", new_is_dark ? "dark" : "light");
      return new_is_dark;
    });
  };

  return (
    <div>
      Header
      <button onClick={toggleDark}>Toggle Dark</button>
    </div>
  );
};

export default Header;
