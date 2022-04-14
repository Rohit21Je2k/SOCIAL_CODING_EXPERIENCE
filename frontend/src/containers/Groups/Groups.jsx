import React, { useState } from "react";
import getMenu from "../../ui/Menu";
import AllGroups from "./AllGroups";
import AddGroup from "./AddGroup";
import CreateGroup from "./CreateGroup";
import GroupRequest from "./GroupRequest";

export default function Groups() {
  const Menu = getMenu(2);
  const [selected, setSelected] = useState(1);

  const handleClick = (menuNum) => {
    return () => {
      setSelected(menuNum);
    };
  };
  return (
    <div className="groups-page">
      <div className="wrapper">
        <Menu type="2">
          <Menu.Item
            onClick={handleClick(1)}
            className={selected === 1 ? "selected" : null}
          >
            All Groups
          </Menu.Item>
          <Menu.Item
            onClick={handleClick(2)}
            className={selected === 2 ? "selected" : null}
          >
            Add Group
          </Menu.Item>
          <Menu.Item
            onClick={handleClick(3)}
            className={selected === 3 ? "selected" : null}
          >
            Create Group
          </Menu.Item>
          <Menu.Item
            onClick={handleClick(4)}
            className={selected === 4 ? "selected" : null}
          >
            Group Requests
          </Menu.Item>
        </Menu>
        {selected === 1 && <AllGroups />}
        {selected === 2 && <AddGroup />}
        {selected === 3 && <CreateGroup />}
        {selected === 4 && <GroupRequest />}
      </div>
    </div>
  );
}
