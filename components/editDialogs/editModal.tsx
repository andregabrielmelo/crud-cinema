import { Assento, GenericData, Produto, Sala, TableName } from "@/lib/definitions";
import EditSala from "./editSala";
import { ReactElement } from "react";
import EditAssento from "./editAssento";
import EditProduto from "./editProduto";

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
    produtos: <EditProduto data={data as Produto} onClose={onClose} />,
  };

  return editModal[tableName];
}
