"use client";

import { useModal } from "@/hooks/useModal";
import styles from "./styles.module.scss";
import { IoWarningOutline } from "react-icons/io5";
import { removeUnusedParams } from "@/utils/removeUnusedParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Modal = ({ action }: { action: React.MouseEventHandler<HTMLButtonElement> }) => {
  const { showModal, setShowModal } = useModal();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const hasParams = searchParams.size !== 0;
  const modalStyle = `${styles.modalContainer} ${showModal && styles.show}`;
  const handleCancel = () => {
    const params = new URLSearchParams(searchParams.toString());
    setShowModal(false);
    removeUnusedParams({
      searchParams: params,
      key: "targetOrderDelete",
      value: "",
    });

    router.push(`${pathname}${hasParams ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className={modalStyle}>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          <IoWarningOutline color={"white"} />
          <h3>Confirmar ação</h3>
        </div>
        <p>Ao confirmar, não será possível reverter</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.confirm} onClick={action}>
          Confirmar
        </button>
        <button className={styles.cancel} onClick={() => handleCancel()}>
          Cancelar
        </button>
      </div>
    </div>
  );
};
