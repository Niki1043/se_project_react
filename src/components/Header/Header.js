//Header Component
import "./Header.css";

const Header = ({ onCreateModal }) => {
  //console.log("Header");

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src="/images/headerlogo.svg" alt="logo" />
        </div>
        <div>Date</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button type="text" onClick={onCreateModal}>
            Add New Clothes
          </button>
        </div>
        <div>Terrence Tegegne</div>
        <div>
          <img src="/images/avatar.svg" alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
