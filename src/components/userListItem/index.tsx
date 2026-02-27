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

const ListItem = ({
  userInfos,
  refetch,
  deleteButtonEndpoint,
}: ListItemProps) => {
  const pathname = usePathname();

  return (
    <div className={styles.userListItem}>
      <span>{userInfos.user_id}</span>
      <span>{userInfos.name}</span>
      {userInfos.email && <span>{userInfos.email}</span>}
      <span>{userInfos.user_type}</span>
      <div className={styles.buttons}>
        <DeleteButton
          endpoint={deleteButtonEndpoint}
          refetch={refetch}
          uuid={userInfos.user_id}
        />
        <EditButton href={`${pathname}/edit/${userInfos.user_id}`} />
      </div>
    </div>
  );
};

export default ListItem;
