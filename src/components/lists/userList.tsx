"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import SearchBar from "../searchBar";
import UserTypeFilter from "../userTypeFilter";
import { useUsers } from "@/hooks/useUsers";
import ListItem from "../userListItem";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FilterMobileContainer from "../filterMobileContainer";
import { useLoading } from "@/hooks/useLoading";
import Loading from "../ui/loading";

const UserListContainer = () => {
  const { usersData, refetch } = useUsers();
  const [userTypeFilter, setUserTypeFilter] = useState("");
  const { isLoading } = useLoading();
  const [searchFilter, setSearchFilter] = useState("");
  const [openFilterContainer, setOpenFilterContainer] = useState(false);
  const router = useRouter();
  const userListFiltered = useMemo(() => {
    return usersData?.filter(
      (user) =>
        (userTypeFilter ? user.user_type === userTypeFilter : true) &&
        (searchFilter ? user.email.includes(searchFilter) || user.name.includes(searchFilter) : true),
    );
  }, [userTypeFilter, searchFilter, usersData]);

  useEffect(() => {
    const filterParams = new URLSearchParams();

    filterParams.set("tipo_usuario", userTypeFilter);
    filterParams.set("pesquisa", searchFilter);
  }, [router, userTypeFilter, searchFilter, usersData]);

  return (
    <>
      {isLoading && <Loading />}
      <main style={{ gap: "1rem" }} className={`mainContainer ${isLoading && "loading"}`}>
        <FiltersList
          buttonLabel="Adicionar usuário"
          hrefButton="/usuarios/register"
          openMobileFilters={setOpenFilterContainer}
          openFilterContainer={openFilterContainer}
        >
          <SearchBar searchValue={searchFilter} setSearchValue={setSearchFilter} />
          <UserTypeFilter setUserFilter={setUserTypeFilter} userFilter={userTypeFilter} />
        </FiltersList>
        <FilterMobileContainer isFilterContainerOpen={openFilterContainer}>
          <SearchBar searchValue={searchFilter} setSearchValue={setSearchFilter} />
          <UserTypeFilter setUserFilter={setUserTypeFilter} userFilter={userTypeFilter} />
        </FilterMobileContainer>
        <ul className={styles.listContainer}>
          <div className={styles.listHeader}>
            <span>ID</span>
            <span>Nome</span>
            <span>Email</span>
            <span>Tipo de usuário</span>
            <span className={styles.actionsSpan}>Ações</span>
          </div>
          {userListFiltered?.map((user) => (
            <li key={user.user_id}>
              <ListItem deleteButtonEndpoint="users" refetch={refetch} userInfos={user} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default UserListContainer;
