import { GenericData, Sala, TableName } from "@/lib/definitions";
import EditSala from "./editSala";
import { ReactElement } from "react";

export default function EditModal(props: {
  tableName: TableName;
  data: GenericData;
}) {
  const { data, tableName } = props;
  const editModal: {
    [key: string]: ReactElement;
  } = {
    salas: <EditSala data={data as Sala} />,
  };

  return editModal[tableName];
}
