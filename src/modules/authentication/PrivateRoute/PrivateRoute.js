import React, { useEffect, useState } from "react";
import { Navigate, Route, Outlet } from "react-router-dom";
import { getCookieFromBrowser } from "../../../utils/cookie";
import { SidebarData } from "../../layout/components/SidebarData";
import { decodeB64 } from "../../../utils/crypto";

const PrivateRoute = () => {
  let role = decodeB64(getCookieFromBrowser("Role"));
  let isLoggedIn = getCookieFromBrowser("a");

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

  return isAllowed() ? <Outlet /> : isLoggedIn ?  <Navigate to="/news" /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
