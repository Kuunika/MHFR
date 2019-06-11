import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { setActivePage } from "../../services/redux/actions/ui";
import { connect } from "react-redux";
import ExpandableListItem from "../atoms/ExpandableListItem";

const SearchDrawer = (props: Props) => {
  const { open, onClose, items, setActivePage } = props;

  return (
    <SwipeableDrawer
      open={open}
      onOpen={() => {}}
      onClose={() => onClose(false)}
    >
      <List>
        {items.map((item, index) =>
          item.options ? (
            <ExpandableListItem
              key={item.text}
              onItemClick={() => setActivePage(item.name)}
              item={item}
            />
          ) : (
            <Link
              key={item.text}
              to={item.link ? item.link : ""}
              onClick={() => setActivePage(item.name)}
            >
              <ListItem button key={index}>
                <ListItemIcon>
                  <>{item.icon}</>
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          )
        )}
      </List>
    </SwipeableDrawer>
  );
};
export default connect(
  null,
  { setActivePage }
)(SearchDrawer);

type Props = {
  open: boolean;
  onClose: Function;
  items: Array<{
    text: string;
    active: boolean;
    icon?: React.ReactElement;
    link?: string;
    name: string;
    options?: Array<any>;
  }>;
  setActivePage: Function;
};
