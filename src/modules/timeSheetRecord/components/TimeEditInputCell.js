import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { updateTimeSheet } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { getTimeSheetInformationByDate } from "../actions";
import { getDateFormat } from "../../../utils/miscellaneous";
import { getCookieFromBrowser, removeCookie } from "../../../utils/cookie";

export function renderTime(params) {
  return <div>{moment(params.value).format("HH:mm")}</div>;
}

function TimeEditInputCell(props) {
  const { id, value, api, field } = props;
  const dispatch = useDispatch();

  const { dateState } = useSelector((state) => state.timesheetReducer);

  const onChange = async (item) => {
    console.log(id);

    const values = {
      [field]: moment(item).format("HH:mm"),
      Sheet_id: String(id),
    };
    api.setEditCellValue({ id, field, value: item });
    await updateTimeSheet(values);
    dispatch(getTimeSheetInformationByDate("", "", dateState.date));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "200px",
          pr: 0.5,
          pl: 0.5,
        }}
      >
        <TimePicker
          name="time"
          value={value}
          ampm={false}
          size="small"
          InputProps={{
            disableUnderline: true,
          }}
          fullWidth
          inputFormat="HH:mm"
          onChange={(e) => onChange(e)}
          renderInput={(params) => (
            <TextField
              size="small"
              fullWidth
              disabled={true}
              InputProps={{ disableUnderline: true }}
              variant="standard"
              {...params}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
}

TimeEditInputCell.propTypes = {
  /**
   * GridApi that let you manipulate the grid.
   */
  api: PropTypes.object.isRequired,
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * The cell value, but if the column has valueGetter, use getValue.
   */
};

export function renderTimeEditInputCell(params) {
  return <TimeEditInputCell {...params} />;
}
