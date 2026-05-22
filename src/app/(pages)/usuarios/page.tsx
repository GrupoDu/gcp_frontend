import React from "react";
import "../../globals.scss";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import { UserProvider } from "@/providers/users.provider";
import UserListContainer from "@/components/lists/userList";
import OpenMobileProvider from "@/providers/openMobile.provider";

const UsersPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      <OpenMobileProvider>
        <UserListContainer />
      </OpenMobileProvider>
    </div>
  );
};

export default UsersPage;
