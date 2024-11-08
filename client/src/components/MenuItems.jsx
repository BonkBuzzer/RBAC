import React from "react";
import { useAppSelector } from "../store/hooks";

const MenuItems = () => {
  const userData = useAppSelector((state) => state.user.userData);
  console.log(userData.menuItems);
  return (
    <div>
      {userData.menuItems.map((item, idx) => {
        return (
          <div key={idx} className="text-black">
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default MenuItems;
