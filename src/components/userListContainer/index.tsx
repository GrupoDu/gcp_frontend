"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import SearchBar from "../searchBar";
import UserRoleFilter from "../userRoleFilter";
import { UserProvider } from "@/providers/users.provider";
import ListItem from "../userListItem";
import { useSearchParams } from "next/navigation";
import { User } from "@/types/user.type";
import FilterMobileContainer from "../filterMobileContainer";
import { useFetch } from "@/hooks/useFetch";

const UserListContainer = () => {
  const { data: users, refetch } = useFetch<User[]>("users");
  const searchParams = useSearchParams();
  const searchFilterParam = searchParams.get("name");
  const userRoleFilter = searchParams.get("user_role");
  const userListFiltered = users?.filter(
    (user) =>
      (userRoleFilter ? user.user_role === userRoleFilter : true) &&
      (searchFilterParam ? user.email.includes(searchFilterParam) || user.name.includes(searchFilterParam) : true),
  );

  return (
    <UserProvider>
      <div className={styles.userListContainer}>
        <FiltersList buttonLabel="Adicionar usuário" hrefButton="/usuarios/register">
          <SearchBar targetFilter={"name"} />
          <UserRoleFilter />
        </FiltersList>
        <FilterMobileContainer>
          <SearchBar targetFilter={"name"} />
          <UserRoleFilter />
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
