"use client";

import { useFetch } from "@/hooks/useFetch";
import { Register } from "@/types/register.type";
import CardRegister from "../ui/cardRegister";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { dataFormater } from "@/utils/dataFormater";

const RegisterList = () => {
  const { data, err, status } = useFetch<Register>(
    "http://localhost:8000/registers",
  );

  useEffect(() => {
    console.log("status: ", status);
    console.log("data: ", data);
    console.log("err: ", err);
  }, [data, status, err]);

  return (
    <ul className={styles.ul}>
      {data?.registers!.map((item) => (
        <li key={item.register_id}>
          <CardRegister
            status={item.status}
            title={item.title}
            date={dataFormater(item.deadline)}
            description={item.description}
            register_id={item.register_id}
          />
        </li>
      ))}
    </ul>
  );
};

export default RegisterList;
