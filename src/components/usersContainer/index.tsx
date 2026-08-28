"use client";

import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/user.interface";
import ListItem from "@/components/userListItem";
import { TableList } from "@/components/lists/tableList";
import { useSearchParams } from "next/navigation";
import { USER_TABLE_HEADS } from "@/constants/tableHeads.constant";

const UsersContainer = () => {
  const searchParams = useSearchParams();
  const hasFilters = searchParams.size > 0;
  const endpoint = `user${hasFilters ? "/filter" : ""}?${searchParams.toString()}`;
  const { data: users, refetch } = useFetch<User[]>(endpoint);

  const isListPopulated = !!users && users.length > 0;
  const displayList = users?.map((user) => (
    <ListItem key={user.userUuid} deleteButtonEndpoint="user" refetch={refetch} userInfos={user} />
  ));

  return (
    <TableList tHeadValues={USER_TABLE_HEADS} isListPopulated={isListPopulated}>
      {displayList}
    </TableList>
  );
};

export default UsersContainer;
