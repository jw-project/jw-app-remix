import { DropdownMenu } from "../commons/dropdown-menu";
import { Icon } from "../commons/icon";
import { NotificationBadge } from "../commons/notification-badge";
import tailStyled from "tailwind-styled-components";

const NotificationsStyled = tailStyled.div`
  flex
  items-center
  justify-center
  h-10
  w-10
`;

export const Notifications = () => {
  const Button = (
    <NotificationsStyled>
      <Icon icon="notifications" />
      <NotificationBadge>2</NotificationBadge>
    </NotificationsStyled>
  );

  return (
    <DropdownMenu
      button={Button}
      options={[
        { label: "opt1", to: "" },
        { label: "opt2", to: "" },
        "divider",
        { label: "opt3", to: "" },
      ]}
    />
  );
};
