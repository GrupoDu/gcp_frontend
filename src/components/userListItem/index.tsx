import React from "react";
import styles from "./styles.module.scss";
import DeleteButton from "../deleteButton";
import EditButton from "../editButton";

type UserListItemProps = {
  user_id: string;
  user_name: string;
  user_email: string;
  user_type: string;
  refetch: () => void;
};

const UserListItem = ({
  user_id,
  user_name,
  user_email,
  user_type,
  refetch,
}: UserListItemProps) => {
  return (
    <div className={styles.userListItem}>
      <span>{user_id}</span>
      <span>{user_name}</span>
      <span>{user_email}</span>
      <span>{user_type}</span>
      <div className={styles.buttons}>
        <DeleteButton endpoint="users" refetch={refetch} uuid={user_id} />
        <EditButton />
      </div>
    </div>
  );
};

export default UserListItem;
