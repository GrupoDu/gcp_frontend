import React from "react";
// @ts-expect-error tipagem chata do ts
import "../../globals.scss";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import UserListContainer from "@/components/userListContainer";
import { UserProvider } from "@/providers/users.provider";

const UsersPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      <main className="mainContainer">
        <h2>Lista de usuários</h2>
        <UserProvider>
          <UserListContainer />
        </UserProvider>
      </main>
    </div>
  );
};

export default UsersPage;
