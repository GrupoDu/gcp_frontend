"use client";

import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import UserForm from "@/components/forms/userForm";
import { Breadcrumb } from "@/components/breadcrumb";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";
import { useEffect } from "react";

const RegisterUserPage = () => {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      {isLoading && <Loading />}
      <main className={`mainContainer ${isLoading ? "loading" : ""}`}>
        <Breadcrumb />
        <h3>Registrar novo usuário</h3>
        <UserForm />
      </main>
    </div>
  );
};

export default RegisterUserPage;
