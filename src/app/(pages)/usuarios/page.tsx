import React, { Suspense } from "react";
import "../../globals.scss";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import UserListContainer from "@/components/lists/userList";
import OpenMobileProvider from "@/providers/openMobile.provider";
import Loading from "@/components/ui/loading";

const UsersPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      <OpenMobileProvider>
        <Suspense fallback={<Loading />}>
          <UserListContainer />
        </Suspense>
      </OpenMobileProvider>
    </div>
  );
};

export default UsersPage;
