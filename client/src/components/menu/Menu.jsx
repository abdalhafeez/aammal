// import SideBar from "./SideBar";
import SideBarItems from "../../components/sidebar/SideBarItems";

const Menu = ({ openNav }) => {
  return (
    <div
      className={
        openNav
          ? "open-nav menu d-md-none d-lg-block d-lg-none d-xl-block d-md-none d-lg-block"
          : "menu d-md-none d-lg-block d-lg-none d-xl-block d-md-none d-lg-block"
      }
    >
      <SideBarItems />
    </div>
  )
};

export default Menu;
