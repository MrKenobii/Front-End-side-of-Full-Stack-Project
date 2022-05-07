import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Radio from "@mui/material/Radio";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 50,
  },
  modal: {
    display: "flex",
    maxWidth: 200,
    justifyContent: "center",
    alignItems: "center",
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Avatar = ({ avatarId }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState([1]);
  const [selectedValue, setSelectedValue] = React.useState(avatarId);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const saveAvatar = () => {
    fetch(`/users/${localStorage.getItem("currentUser")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        avatar: selectedValue,
        id: localStorage.getItem("currentUser"),
        username: localStorage.getItem("username"),
        password: localStorage.getItem("tokenKey")
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    saveAvatar();
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }} className={classes.root}>
        <CardMedia
          component="img"
          image={`/avatars/avatar${selectedValue}.png`}
          alt="green iguana"
          title="User Avatar"
          alt="User Avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Username
          </Typography>
          <Typography variant="body2" color="text.secondary">
            User Info
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            Change Avatar
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List
            dense
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {[1, 2, 3, 4, 5, 6].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem
                  key={value}
                  secondaryAction={
                    <Radio
                      edge="end"
                      value={value}
                      onChange={handleChange}
                      checked={"" + selectedValue === "" + value}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <CardMedia
                        style={{ maxWidth: 100 }}
                        component="img"
                        alt={`Avatar n. ${value}`}
                        image={`/avatars/avatar${value}.png`}
                        title="User Avatar"
                      />
                    </ListItemAvatar>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Modal>
    </>
  );
};
export default Avatar;
