import React from "react";
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Typography,
} from "@material-ui/core/";

const LocationsDropdown = ({ anchorRef, locations = [], fetchWeather }) => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (locations.length > 0) {
      setOpen(true);
    }
    return () => {
      setOpen(false);
    };
  }, [locations]);

  const handleClose = (event, locationCode) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    fetchWeather(locationCode);
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      placement="bottom-start"
      style={{ zIndex: "1" }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                {locations.length > 0 ? (
                  <Typography variant="h3">
                    Multiple locations found. Please choose one.
                  </Typography>
                ) : (
                  <></>
                )}
                {locations.map((location) => {
                  return (
                    <MenuItem
                      key={location.key}
                      onClick={(e) => handleClose(e, location.key)}
                    >
                      {location.name},{location.country}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
export default LocationsDropdown;
