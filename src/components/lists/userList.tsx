"use client";

import styles from "./styles.module.scss";
import FiltersList from "../filtersList";
import SearchBar from "../searchBar";
import UserRoleFilter from "../userRoleFilter";
import ListItem from "../userListItem";
import { useSearchParams } from "next/navigation";
import FilterMobileContainer from "../filterMobileContainer";
import { useLoading } from "@/hooks/useLoading";
import Loading from "../ui/loading";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/user.type";

const UserListContainer = () => {
  const { data: users, refetch } = useFetch<User[]>("users");
  const { isLoading } = useLoading();
  const searchParams = useSearchParams();
  const userRoleFilter = searchParams.get("user_role");
  const searchFilter = searchParams.get("name");
  const userListFiltered = users?.filter(
    (user) =>
      (userRoleFilter ? user.user_role === userRoleFilter : true) &&
      (searchFilter ? user.email.includes(searchFilter) || user.name.includes(searchFilter) : true),
  );

  return (
    <>
      {isLoading && <Loading />}
      <main style={{ gap: "1rem" }} className={`mainContainer ${isLoading && "loading"}`}>
        <FiltersList buttonLabel="Adicionar usuário" hrefButton="/usuarios/register">
          <SearchBar targetFilter={"name"} />
          <UserRoleFilter />
        </FiltersList>
        <FilterMobileContainer>
          <SearchBar targetFilter={"name"} />
          <UserRoleFilter />
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
            <li key={user.user_uuid}>
              <ListItem deleteButtonEndpoint="users" refetch={refetch} userInfos={user} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default UserListContainer;
