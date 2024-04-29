import { Avatar } from "flowbite-react";
import AvatarLogo from "../assets/images/avatar.png";
export function AvatarComponent({ url }) {
  return (
    <div className="flex flex-wrap gap-2">
      {url ? (
        <Avatar img={url} alt="avatar of Jese" rounded />
      ) : (
        <img src={AvatarLogo} />
      )}
    </div>
  );
}
