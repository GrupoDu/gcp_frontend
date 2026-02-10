import React from "react";
import styles from "../../register/page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
// @ts-expect-error tipagem chata do ts
import "../../../../globals.scss";
import { EmployeeProvider } from "@/providers/employee.provider";
import { UserProvider } from "@/providers/users.provider";
import RegisterForm from "@/components/forms/registerForm";
import { ProductProvider } from "@/providers/products.provider";
import { RegisterProvider } from "@/providers/register.provider";

const EditRegisterPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <div className={styles.pageContainer}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Editar registro" />
      <main className="mainContainer">
        <h2>Editar registro de produção</h2>
        <EmployeeProvider>
          <RegisterProvider>
            <UserProvider>
              <ProductProvider>
                <RegisterForm isEditPage={true} registerId={slug} />
              </ProductProvider>
            </UserProvider>
          </RegisterProvider>
        </EmployeeProvider>
      </main>
    </div>
  );
};

export default EditRegisterPage;
