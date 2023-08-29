import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FollowerModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const follower = props.follower;
  const navigate = useNavigate;

  return (
    <div>
      <div id="modalbtn">
        <Button
          variant="text"
          sx={{ color: "white", fontSize: 4 }}
          onClick={handleOpen}
        >
          follower
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {"follower"}
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {follower.map((ele) => (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <IconButton>
                    <Avatar
                      alt="Remy Sharp"
                      src={ele.picture}
                      onClick={() => {
                        // window.open(`/profile?user=${ele.email}`, "_blank");
                        navigate(`profile?user=${ele.email}`);
                        window.location.reload();
                      }}
                    />
                  </IconButton>
                </ListItemAvatar>
                <ListItemText
                  primary={ele.nickname}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      ></Typography>
                      {ele.email}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </div>
  );
}
