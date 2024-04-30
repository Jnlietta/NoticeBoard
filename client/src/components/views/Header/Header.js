import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { selectorIsLoggedIn } from "../../../redux/authRedux";

const Header = props => {
    const isLoggedIn = useSelector(selectorIsLoggedIn);

    return(
        <NavBar isLoggedIn={isLoggedIn} />
    );
};

export default Header;