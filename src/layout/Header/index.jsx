import { NavLink, Link } from "react-router-dom";
import logo from "../../images/logo.png"
import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Header = () => {
    return (
        <header>
            <Link to="/">
                <img src={logo} alt="Neha Travels" className="logo" />
            </Link>
            <nav>
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/about">ABOUT</NavLink>
                <NavLink to="/groupfare">ADD GROUP</NavLink>
            </nav>
            <article>
                <FaWhatsapp size={36} color="green" className="icon" />
                <FiPhoneCall size={35} color="blue" className="icon" />
            </article>
        </header>
    );
}

export default Header;
