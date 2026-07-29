import DataNotFound from "@/components/dataNotFound";

type TableListProps = {
  children: React.ReactNode;
  tHeadValues: string[];
  isListPopulated: boolean;
};

export const TableList = ({ children, tHeadValues, isListPopulated }: TableListProps) => {
  if (!isListPopulated) return <DataNotFound />;

  const headValues = tHeadValues.map((value) => <th key={value}>{value}</th>);

  return (
    <div className="tableWrapper">
      <table style={{ borderRadius: 0 }} className={"listContainer"}>
        <thead className={"listHeader"}>
          <tr>{headValues}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
