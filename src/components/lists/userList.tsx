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
import { User } from "@/types/user.interface";

const UserListContainer = () => {
  const { data: users, refetch } = useFetch<User[]>("users");
  const { isLoading } = useLoading();
  const searchParams = useSearchParams();
  const userRoleFilter = searchParams.get("userRole");
  const searchFilter = searchParams.get("name");
  const userListFiltered = users?.filter(
    (user) =>
      (userRoleFilter ? user.userRole === userRoleFilter : true) &&
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
        <div className="tableWrapper" style={{ borderRadius: ".4rem" }}>
          <table className={"listContainer"}>
            <thead className={"listHeader"}>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Tipo de usuário</th>
                <th className={styles.actionsSpan}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {userListFiltered?.map((user) => (
                <ListItem key={user.userUuid} deleteButtonEndpoint="users" refetch={refetch} userInfos={user} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default UserListContainer;
