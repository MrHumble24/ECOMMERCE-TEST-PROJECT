import { NavLink as RouterNavLink } from "react-router-dom";
import { IconChevronRight } from "@tabler/icons-react";
import { CSSProperties } from "react";
import useSettingsStore from "../../../stores/useSettingsStore";

// Define types for the props
interface CustomNavLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  exact?: boolean;
}

// Styles for the custom NavLink
const navLinkStyle: CSSProperties = {
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  padding: "10px 15px",

  borderRadius: "4px",
};

const activeNavLinkStyle: CSSProperties = {
  fontWeight: "bold",
  color: "#1c7ed6", // Adjust active color based on your theme
  backgroundColor: "#f1f3f5", // Active background color
};

const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, label, icon }) => {
  const toggleMenu = useSettingsStore((s) => s.toggleMenu);

  return (
    <RouterNavLink
      onClick={() => toggleMenu()}
      to={to}
      style={({ isActive }) => ({
        ...navLinkStyle,
        ...(isActive ? activeNavLinkStyle : {}),
      })}
    >
      {icon && <span style={{ marginRight: "10px" }}>{icon}</span>}
      <span style={{ flexGrow: 1 }}>{label}</span>
      <IconChevronRight size="0.8rem" stroke={1.5} />
    </RouterNavLink>
  );
};

export default CustomNavLink;
