import { IconButton, Menu, MenuItem } from "@mui/material";
import { EllipsisVertical, Eye, Trash2 } from "lucide-react";
import React from "react";

type Props = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

function ActionMenu(props: Props) {
  const { onView, onDelete } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <EllipsisVertical size={16} />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            if (onView) onView();
          }}
        >
          <Eye className="mr-2" size={16} />
          <span>View</span>
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            handleClose();
            if (onEdit) onEdit();
          }}
        >
          <Edit className="mr-2" size={16} />
          <span>Edit</span>
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            handleClose();
            if (onDelete) onDelete();
          }}
        >
          <Trash2 className="mr-2" size={16} />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ActionMenu;
