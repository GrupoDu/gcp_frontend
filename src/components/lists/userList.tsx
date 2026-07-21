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
  const { isLoading } = useLoading();
  const searchParams = useSearchParams();
  const userRoleFilter = searchParams.get("userRole");
  const searchFilter = searchParams.get("name");
  const filtersString = `user/filter?userRole=${userRoleFilter || ""}&name=${searchFilter || ""}`;
  const isFiltered = userRoleFilter || searchFilter;
  const endpoint = isFiltered ? filtersString : "user";
  const { data: users, refetch } = useFetch<User[]>(endpoint);

  return (
    <>
      {isLoading && <Loading />}
      <main style={{ gap: "1rem" }} className={`mainContainer ${isLoading && "loading"}`}>
        <FiltersList buttonLabel="Adicionar usuário" hrefButton="/usuarios/register" setFilters={filtersString}>
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
              {users?.map((user) => (
                <ListItem key={user.userUuid} deleteButtonEndpoint="user" refetch={refetch} userInfos={user} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default UserListContainer;
