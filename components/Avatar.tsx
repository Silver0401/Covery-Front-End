import React, { useContext } from "react";
import { GlobalContext } from "../e2e/globalContext";
import Avatar from "boring-avatars";

interface avatarProps {
  size: number;
}

const RandomAvatar: React.FC<avatarProps> = ({ size }) => {
  const { userData } = useContext(GlobalContext);

  return <Avatar size={size} variant="beam" colors={userData.avatar.colors} />;
};

export default RandomAvatar;
