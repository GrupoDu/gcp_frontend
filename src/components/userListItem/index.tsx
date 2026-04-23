import React from "react";
import styles from "./styles.module.scss";
import DeleteButton from "../deleteButton";
import EditButton from "../editButton";
import { usePathname } from "next/navigation";
import { UserPublic } from "@/types/user.type";

type ListItemProps = {
  userInfos: UserPublic;
  refetch: () => void;
  deleteButtonEndpoint: string;
};

const ListItem = ({ userInfos, refetch, deleteButtonEndpoint }: ListItemProps) => {
  const pathname = usePathname();
  const { user_uuid, user_role, name, email } = userInfos;

  return (
    <div className={styles.userListItem}>
      <span>{user_uuid}</span>
      <span>{name}</span>
      {email && <span>{email}</span>}
      <span>{user_role}</span>
      <div className={styles.buttons}>
        <DeleteButton endpoint={deleteButtonEndpoint} refetch={refetch} uuid={user_uuid} />
        <EditButton href={`${pathname}/edit/${userInfos.user_uuid}`} />
      </div>
    </div>
  );
};

export default ListItem;
