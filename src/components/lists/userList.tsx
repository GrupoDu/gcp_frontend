"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import SearchBar from "../searchBar";
import UserTypeFilter from "../userTypeFilter";
import { useUsers } from "@/hooks/useUsers";
import ListItem from "../userListItem";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user.type";
import FilterMobileContainer from "../filterMobileContainer";

const UserListContainer = () => {
  const { usersData, refetch } = useUsers();
  const [userTypeFilter, setUserTypeFilter] = useState("");
  const [userListFiltered, setUserListFiltered] = useState<User[] | undefined>(
    [],
  );
  const [searchFilter, setSearchFilter] = useState("");
  const [openFilterContainer, setOpenFilterContainer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const filterParams = new URLSearchParams();

    filterParams.set("tipo_usuario", userTypeFilter);
    filterParams.set("pesquisa", searchFilter);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserListFiltered(
      usersData?.filter(
        (user) =>
          (userTypeFilter ? user.user_type === userTypeFilter : true) &&
          (searchFilter
            ? user.email.includes(searchFilter) ||
              user.name.includes(searchFilter)
            : true),
      ),
    );
  }, [router, userTypeFilter, searchFilter, usersData]);

  return (
    <>
      <FiltersList
        buttonLabel="Adicionar usuário"
        hrefButton="/usuarios/register"
        openMobileFilters={setOpenFilterContainer}
        openFilterContainer={openFilterContainer}
      >
        <SearchBar
          searchValue={searchFilter}
          setSearchValue={setSearchFilter}
        />
        <UserTypeFilter
          setUserFilter={setUserTypeFilter}
          userFilter={userTypeFilter}
        />
      </FiltersList>
      <FilterMobileContainer isFilterContainerOpen={openFilterContainer}>
        <SearchBar
          searchValue={searchFilter}
          setSearchValue={setSearchFilter}
        />
        <UserTypeFilter
          setUserFilter={setUserTypeFilter}
          userFilter={userTypeFilter}
        />
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
            <ListItem
              deleteButtonEndpoint="users"
              refetch={refetch}
              user_name={user.name}
              user_id={user.user_id}
              user_email={user.email}
              user_type={user.user_type}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserListContainer;
