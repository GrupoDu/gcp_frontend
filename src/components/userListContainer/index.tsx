"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import SearchBar from "../searchBar";
import UserRoleFilter from "../userRoleFilter";
import { UserProvider } from "@/providers/users.provider";
import { useUsers } from "@/hooks/useUsers";
import ListItem from "../userListItem";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user.type";
import FilterMobileContainer from "../filterMobileContainer";

const UserListContainer = () => {
  const { usersData, refetch } = useUsers();
  const [openFilterContainer, setOpenFilterContainer] = useState(false);
  const [userRoleFilter, setUserRoleFilter] = useState("");
  const [userListFiltered, setUserListFiltered] = useState<User[] | undefined>([]);
  const [searchFilter, setSearchFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    const filterParams = new URLSearchParams();

    filterParams.set("tipo_usuario", userRoleFilter);
    filterParams.set("pesquisa", searchFilter);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserListFiltered(
      usersData?.filter(
        (user) =>
          (userRoleFilter ? user.user_role === userRoleFilter : true) &&
          (searchFilter ? user.email.includes(searchFilter) || user.name.includes(searchFilter) : true),
      ),
    );
  }, [router, userRoleFilter, searchFilter, usersData]);

  return (
    <UserProvider>
      <div className={styles.userListContainer}>
        <FiltersList
          openFilterContainer={openFilterContainer}
          openMobileFilters={setOpenFilterContainer}
          buttonLabel="Adicionar usuário"
          hrefButton="/usuarios/register"
        >
          <SearchBar searchValue={searchFilter} setSearchValue={setSearchFilter} />
          <UserRoleFilter setUserFilter={setUserRoleFilter} userFilter={userRoleFilter} />
        </FiltersList>
        <FilterMobileContainer isFilterContainerOpen={openFilterContainer}>
          <SearchBar searchValue={searchFilter} setSearchValue={setSearchFilter} />
          <UserRoleFilter setUserFilter={setUserRoleFilter} userFilter={userRoleFilter} />
        </FilterMobileContainer>
      </div>
      <ul className={styles.listContainer}>
        <div className={styles.listHeader}>
          <span>ID</span>
          <span>Nome</span>
          <span>Email</span>
          <span>Tipo de usuário</span>
          <span className={styles.actionsSpan}>Ações</span>
        </div>
        {userListFiltered?.map((user) => (
          <li key={user.user_uuid}>
            <ListItem deleteButtonEndpoint={`/usuarios/${user.user_uuid}`} refetch={refetch} userInfos={user} />
          </li>
        ))}
      </ul>
    </UserProvider>
  );
};

export default UserListContainer;
