import UsersContainer from "@/components/usersContainer";
import { Suspense } from "react";
import React from "react";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import Loading from "@/components/ui/loading";

const UsersPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      <Suspense fallback={<Loading />}>
        <UsersContainer />
      </Suspense>
    </div>
  );
};

export default UsersPage;
