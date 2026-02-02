import styles from "./styles.module.scss";
import LinkButton from "../linkButton";
import { FaExternalLinkAlt } from "react-icons/fa";
import CardRegister from "../cardRegister";

const ProductionRegisterSection = () => {
  const fakeRegistersData = [
    {
      id: 1,
      titulo: "Relatório Trimestral",
      descricao: "Preparar e revisar relatório de desempenho do Q3",
      data: "2024-03-15T10:00:00",
      status: "Entregue",
    },
    {
      id: 2,
      titulo: "Reunião com Cliente",
      descricao: "Apresentar proposta de novo projeto",
      data: "2024-03-18T14:30:00",
      status: "Pendente",
    },
    {
      id: 3,
      titulo: "Atualização do Sistema",
      descricao: "Implementar novas funcionalidades no módulo de vendas",
      data: "2024-03-10T09:00:00",
      status: "Não entregue",
    },
    {
      id: 4,
      titulo: "Análise de Dados",
      descricao: "Processar dados de vendas do último mês",
      data: "2024-03-20T16:00:00",
      status: "Pendente",
    },
    {
      id: 5,
      titulo: "Treinamento da Equipe",
      descricao: "Capacitação sobre novo software de gestão",
      data: "2024-03-12T13:00:00",
      status: "Entregue",
    },
    {
      id: 6,
      titulo: "Manutenção Preventiva",
      descricao: "Verificação dos equipamentos do laboratório",
      data: "2024-03-25T08:00:00",
      status: "Pendente",
    },
  ];

  return (
    <div className={styles.productionRegisterSectionContainer}>
      <LinkButton
        href="/pendingRegisters"
        placeholder="Lista completa"
        Icon={FaExternalLinkAlt}
      />
      <ul>
        {fakeRegistersData.map((register) => (
          <li key={register.id}>
            <CardRegister
              status={register.status}
              title={register.titulo}
              date={register.data}
              description={register.descricao}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductionRegisterSection;
