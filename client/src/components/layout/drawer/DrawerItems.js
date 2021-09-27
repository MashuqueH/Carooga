import React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InventoryIcon from "@mui/icons-material/Inventory";
import Toolbar from "@mui/material/Toolbar";

function DrawerItems(props) {
    return (
        <div>
            <Toolbar sx={{ boxShadow: 3, background: "#1976d2" }} />
            <Divider />
            <List>
                <ListItem button key='Inventory'>
                    <ListItemIcon>
                        <InventoryIcon />
                    </ListItemIcon>
                    <ListItemText primary='Inventory' />
                </ListItem>
            </List>
            <Divider />
        </div>
    );
}

DrawerItems.propTypes = {};

export default DrawerItems;
