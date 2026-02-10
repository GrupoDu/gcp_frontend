import React from "react";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { FaUserCog } from "react-icons/fa";
import UserForm from "@/components/forms/userForm";
import { UserProvider } from "@/providers/users.provider";

const UserEditPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Usuários" HeaderIcon={FaUserCog} />
      <main className="mainContainer">
        <h3>Editar usuário</h3>
        <UserProvider>
          <UserForm isEdit={true} user_id={slug} />
        </UserProvider>
      </main>
    </div>
  );
};

export default UserEditPage;
