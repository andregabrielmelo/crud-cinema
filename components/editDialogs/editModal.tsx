import { Assento, GenericData, Sala, TableName } from "@/lib/definitions";
import EditSala from "./editSala";
import { ReactElement } from "react";
import EditAssento from "./editAssento";

export default function EditModal(props: {
  tableName: TableName;
  data: GenericData;
  onClose: () => void;
}) {
  const { data, tableName, onClose } = props;
  const editModal: {
    [key: string]: ReactElement;
  } = {
    salas: <EditSala data={data as Sala} onClose={onClose} />,
    assentos: <EditAssento data={data as Assento} onClose={onClose} />,
  };

  return editModal[tableName];
}
