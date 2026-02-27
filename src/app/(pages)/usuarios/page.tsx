import React from "react";
// @ts-expect-error tipagem chata do ts
import "../../globals.scss";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import { UserProvider } from "@/providers/users.provider";
import UserListContainer from "@/components/lists/userList";

const UsersPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      <UserProvider>
        <UserListContainer />
      </UserProvider>
    </div>
  );
};

export default UsersPage;
