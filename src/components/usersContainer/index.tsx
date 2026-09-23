"use client";

import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/user.interface";
import ListItem from "@/components/userListItem";
import { TableList } from "@/components/lists/tableList";
import { useSearchParams } from "next/navigation";
import { USER_TABLE_HEADS } from "@/constants/tableHeads.constant";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { Modal } from "../modal";
import { useModal } from "@/hooks/useModal";

const UsersContainer = () => {
  const searchParams = useSearchParams();
  const hasFilters = searchParams.size > 0;
  const { setShowModal } = useModal();
  const endpoint = `user${hasFilters ? "/filter?" : "/active"}${searchParams.toString()}`;
  const { data: users, refetch } = useFetch<User[]>(endpoint);

  const isListPopulated = !!users && users.length > 0;

  const handleDeactivateUser = async (userUuid: string) => {
    try {
      await api.put(`user/deactivate/${userUuid}`);
      toast.success("Usuário desativado com sucesso.");
      refetch();
    } catch (e) {
      const err = e as Error;
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setShowModal(false);
    }
  };

  const displayList = users?.map((user) => (
    <>
      <Modal action={() => handleDeactivateUser(user.uuid)} />
      <ListItem key={user.uuid} deleteButtonEndpoint="user" refetch={refetch} userInfos={user} />
    </>
  ));

  return (
    <TableList tHeadValues={USER_TABLE_HEADS} isListPopulated={isListPopulated}>
      {displayList}
    </TableList>
  );
};

export default UsersContainer;
