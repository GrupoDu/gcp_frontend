"use client";

import React from "react";
import OpenMobileProvider from "@/providers/openMobile.provider";
import Loading from "@/components/ui/loading";
import { useLoading } from "@/hooks/useLoading";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/user.interface";
import ListItem from "@/components/userListItem";
import FiltersList from "@/components/filtersList";
import SearchBar from "@/components/searchBar";
import UserRoleFilter from "@/components/userRoleFilter";
import { TableList } from "@/components/lists/tableList";
import { TRACK_PARAMS } from "@/constants/trackParams.constant";
import { useSearchParams } from "next/navigation";

const UsersContainer = () => {
  const { isLoading } = useLoading();
  const searchParams = useSearchParams();
  const hasFilters = searchParams.size > 0;
  const endpoint = `user${hasFilters ? "/filter" : ""}`;
  const { data: users, refetch } = useFetch<User[]>(endpoint, TRACK_PARAMS);

  const tHeadValues = ["Nome", "Email", "Tipo de usuário", "Ações"];
  const isListPopulated = !!users && users.length > 0;
  const displayList = users?.map((user) => (
    <ListItem key={user.userUuid} deleteButtonEndpoint="user" refetch={refetch} userInfos={user} />
  ));

  return (
    <>
      {isLoading && <Loading />}
      <OpenMobileProvider>
        <main style={{ gap: "1rem" }} className={`mainContainer ${isLoading && "loading"}`}>
          <FiltersList buttonLabel="Adicionar usuário" hrefButton="/usuarios/register">
            <SearchBar targetFilter={"name"} />
            <UserRoleFilter />
          </FiltersList>
          <TableList tHeadValues={tHeadValues} isListPopulated={isListPopulated}>
            {displayList}
          </TableList>
        </main>
      </OpenMobileProvider>
    </>
  );
};

export default UsersContainer;
