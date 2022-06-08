import React, { useEffect, useState } from "react";
import { Navigate, Route, Outlet } from "react-router-dom";
import { getCookieFromBrowser } from "../../../utils/cookie";
import { SidebarData } from "../../layout/components/SidebarData";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { accountInformation } = useSelector((state) => state.accountReducer);

  const [allowed, setAllowed] = useState(false);

  //   let allowed = false;

  const isAllowed = () => {
    SidebarData.map((item, index) => {
      item.subNav.map((subItem) => {
        let regex = new RegExp("^" + subItem.path + "$");
        let regex2 = new RegExp(subItem.path + "/");
        if (
          regex.test(window.location.pathname) ||
          regex2.test(window.location.pathname)
        ) {
          const some = (item) => {
            return item.toUpperCase() === accountInformation.Role.toUpperCase();
          };
          setAllowed(subItem.role.some(some));
        }
      });
    });
  };
  useEffect(() => {
    if (Object.keys(accountInformation).length !== 0) {
      isAllowed();
    }
  }, []);

  let isLoggedIn = getCookieFromBrowser("a");

  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
