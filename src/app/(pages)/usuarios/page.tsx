"use client";

import UsersContainer from "@/components/usersContainer";
import { Suspense } from "react";
import React from "react";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import Loading from "@/components/ui/loading";
import { useLoading } from "@/hooks/useLoading";
import FiltersList from "@/components/filtersList";
import SearchBar from "@/components/searchBar";
import UserRoleFilter from "@/components/userRoleFilter";
import OpenMobileProvider from "@/providers/openMobile.provider";

/**
 * Página de listagem e gerenciamento de usuários.
 */
const UsersPage = () => {
  const { isLoading } = useLoading();

  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      {isLoading && <Loading />}
      <main style={{ gap: "1rem" }} className={`mainContainer ${isLoading ? "loading" : ""}`}>
        <OpenMobileProvider>
          <Suspense>
            <FiltersList buttonLabel="Adicionar usuário" hrefButton="/usuarios/register">
              <SearchBar targetFilter={"name"} />
              <UserRoleFilter />
            </FiltersList>
          </Suspense>
          <Suspense fallback={<Loading />}>
            <UsersContainer />
          </Suspense>
        </OpenMobileProvider>
      </main>
    </div>
  );
};

export default UsersPage;
