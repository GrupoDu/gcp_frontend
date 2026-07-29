"use client";

import React, { Suspense } from "react";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import UserListContainer from "@/components/lists/userList";
import OpenMobileProvider from "@/providers/openMobile.provider";
import Loading from "@/components/ui/loading";
import { useLoading } from "@/hooks/useLoading";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/user.interface";
import ListItem from "@/components/userListItem";
import FiltersList from "@/components/filtersList";
import SearchBar from "@/components/searchBar";
import UserRoleFilter from "@/components/userRoleFilter";
import FilterMobileContainer from "@/components/filterMobileContainer";
import { TableList } from "@/components/lists/tableList";

const UsersPage = () => {
  const { isLoading } = useLoading();
  const searchParams = useSearchParams();
  const userRoleFilter = searchParams.get("userRole");
  const searchFilter = searchParams.get("name");
  const filtersString = `user/filter?userRole=${userRoleFilter || ""}&name=${searchFilter || ""}`;
  const isFiltered = userRoleFilter || searchFilter;
  const endpoint = isFiltered ? filtersString : "user";
  const { data: users, refetch } = useFetch<User[]>(endpoint);
  const tHeadValues = ["ID", "Nome", "Email", "Tipo de usuário", "Ações"];
  const isListPopulated = !!users && users.length > 0;
  const displayList = users?.map((user) => (
    <ListItem key={user.userUuid} deleteButtonEndpoint="user" refetch={refetch} userInfos={user} />
  ));

  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      {isLoading && <Loading />}
      <OpenMobileProvider>
        <main style={{ gap: "1rem" }} className={`mainContainer ${isLoading && "loading"}`}>
          <FiltersList buttonLabel="Adicionar usuário" hrefButton="/usuarios/register">
            <SearchBar targetFilter={"name"} />
            <UserRoleFilter />
          </FiltersList>
          <FilterMobileContainer>
            <SearchBar targetFilter={"name"} />
            <UserRoleFilter />
          </FilterMobileContainer>
          <TableList tHeadValues={tHeadValues} isListPopulated={isListPopulated}>
            {displayList}
          </TableList>
        </main>
      </OpenMobileProvider>
    </div>
  );
};

export default UsersPage;
