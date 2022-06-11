import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookieFromBrowser, removeCookie } from "../../../utils/cookie";
import { SidebarData } from "../../layout/components/SidebarData";
import { decodeB64 } from "../../../utils/crypto";
import { useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();

  let role = decodeB64(getCookieFromBrowser("Role"));
  let isLoggedIn = getCookieFromBrowser("a");

  // useEffect(() => {
  //   if (role === "cannotdecodeb64") {
  //     removeCookie("a");
  //     removeCookie("uid");
  //     navigate("/sign-in");
  //   }
  // }, [role]);

  const isAllowed = () => {
    let hvPermission = false;
    SidebarData.map((item, index) => {
      item.subNav.map((subItem) => {
        let regex = new RegExp("^" + subItem.path + "$");
        let regex2 = new RegExp(subItem.path + "/");
        if (
          regex.test(window.location.pathname) ||
          regex2.test(window.location.pathname)
        ) {
          const some = (item) => {
            return item.toUpperCase() === role.toUpperCase();
          };

          hvPermission = subItem.role.some(some);
          if (hvPermission) return hvPermission;
        }
      });
    });
    return hvPermission;
  };

  // return isAllowed() ? <Outlet /> : isLoggedIn ?  <Navigate to="/news" /> : <Navigate to="/sign-in" />;
  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
