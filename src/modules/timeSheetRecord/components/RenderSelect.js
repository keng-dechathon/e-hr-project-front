import React, { useState, useEffect } from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { getChargeCode, getLocation } from "../../timeSheetManagement/actions";
import { useSelector, useDispatch } from "react-redux";
import { updateTimeSheet } from "../actions";
import { getTimeSheetInformationByDate } from "../actions";
import { getCookieFromBrowser, removeCookie } from "../../../utils/cookie";

export const RenderSelectLocation = (params) => {
  const dispatch = useDispatch();
  const { dateState } = useSelector((state) => state.timesheetReducer);
  const { locationInformation } = useSelector(
    (state) => state.timeSheetMngReducer
  );
  useEffect(() => {
    dispatch(getLocation());
  }, []);
  const [info, setInfo] = useState(
    locationInformation && Object.keys(locationInformation).length !== 0
      ? locationInformation.data
      : []
  );

  useEffect(() => {
    if (Object.keys(locationInformation).length !== 0) {
      setInfo(locationInformation.data);
    }
  }, [locationInformation]);
  
  const checkTimeSheetCookie = async () => {
    if (
      getCookieFromBrowser("Sheet_Id") !== undefined &&
      getCookieFromBrowser("Sheet_Detail") !== undefined
    ) {
      const values = {
        Detail: getCookieFromBrowser("Sheet_Detail"),
        Sheet_id: getCookieFromBrowser("Sheet_Id"),
      };
      await updateTimeSheet(values);
      removeCookie("Sheet_Detail");
      removeCookie("Sheet_Id");
    }
    if (
      getCookieFromBrowser("Remark") !== undefined &&
      getCookieFromBrowser("SheetRemark_Id") !== undefined
    ) {
      const values = {
        Remark: getCookieFromBrowser("Remark"),
        Sheet_id: getCookieFromBrowser("SheetRemark_Id"),
      };
      await updateTimeSheet(values);
      removeCookie("Remark");
      removeCookie("SheetRemark_Id");
    }
    dispatch(getTimeSheetInformationByDate("", "", dateState.date));
  };
  const handleChangeLocation = async (e, params) => {
    const values = {
      [params.field]: String(e.target.value),
      Sheet_id: String(params.id),
    };
    checkTimeSheetCookie()
    await updateTimeSheet(values);
    dispatch(getTimeSheetInformationByDate("", "", dateState.date));
  };
  return (
    <Select
      value={params.value}
      onChange={(e) => handleChangeLocation(e, params)}
      displayEmpty
      fullWidth
      disableUnderline
      variant="standard"
      style={{ border: "none !important", borderRadius: "0px important" }}
    >
      {info.length !== 0 ? (
        info.map((item) => {
          return (
            <MenuItem value={item.Location_id} key={item.Location_id}>
              {item.Location_Name}
            </MenuItem>
          );
        })
      ) : (
        <MenuItem value={1} key={1}>
          none
        </MenuItem>
      )}
    </Select>
  );
};

export const RenderSelectChargeCode = (params) => {
  const dispatch = useDispatch();
  const { chargeCodeInformation } = useSelector(
    (state) => state.timeSheetMngReducer
  );
  const { dateState } = useSelector((state) => state.timesheetReducer);
  useEffect(() => {
    dispatch(getChargeCode());
  }, []);
  const [info, setInfo] = useState(
    chargeCodeInformation && Object.keys(chargeCodeInformation).length !== 0
      ? chargeCodeInformation.data
      : []
  );

  useEffect(() => {
    if (Object.keys(chargeCodeInformation).length !== 0) {
      setInfo(chargeCodeInformation.data);
    }
  }, [chargeCodeInformation]);
  const checkTimeSheetCookie = async () => {
    if (
      getCookieFromBrowser("Sheet_Id") !== undefined &&
      getCookieFromBrowser("Sheet_Detail") !== undefined
    ) {
      const values = {
        Detail: getCookieFromBrowser("Sheet_Detail"),
        Sheet_id: getCookieFromBrowser("Sheet_Id"),
      };
      await updateTimeSheet(values);
      removeCookie("Sheet_Detail");
      removeCookie("Sheet_Id");
    }
    if (
      getCookieFromBrowser("Remark") !== undefined &&
      getCookieFromBrowser("SheetRemark_Id") !== undefined
    ) {
      const values = {
        Remark: getCookieFromBrowser("Remark"),
        Sheet_id: getCookieFromBrowser("SheetRemark_Id"),
      };
      await updateTimeSheet(values);
      removeCookie("Remark");
      removeCookie("SheetRemark_Id");
    }
    dispatch(getTimeSheetInformationByDate("", "", dateState.date));
  };
  const handleChangeChargeCode = async (e, params) => {
    const values = {
      [params.field]: String(e.target.value),
      Sheet_id: String(params.id),
    };
    checkTimeSheetCookie()
    await updateTimeSheet(values);
    dispatch(getTimeSheetInformationByDate("", "", dateState.date));
  };
  return (
    <Select
      value={params.value}
      onChange={(e) => handleChangeChargeCode(e, params)}
      displayEmpty
      fullWidth
      disableUnderline
      variant="standard"
      style={{ border: "none !important", borderRadius: "0px important" }}
    >
      {info.length !== 0 ? (
        info.map((item) => {
          return (
            <MenuItem value={item.ChargeCode_id} key={item.ChargeCode_id}>
              {item.ChargeCode_Name}
            </MenuItem>
          );
        })
      ) : (
        <MenuItem value={1} key={1}>
          none
        </MenuItem>
      )}
    </Select>
  );
};
