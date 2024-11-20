"use client";

import { createContext, ReactElement, useContext, useState } from "react";
import { GenericData, TableName } from "./definitions";

export const useTableData = () => useContext(tableDataContext);
type tableDataContextType = {
  data: GenericData[];
  deleteItem: (id: number) => void;
  addItem: (item: GenericData) => void;
  editItem: (item: GenericData) => void;
  setData: (newData: GenericData[]) => void;
  editModal: {
    data?: {
      tableName: TableName;
      data: GenericData;
    };
    setData: (data: { tableName: TableName; data: GenericData }) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
  };
};
const tableDataContext = createContext<tableDataContextType>({
  data: [],
  deleteItem: (id) => {},
  editItem: (item) => {},
  addItem: (item) => {},
  setData: (newData) => {},
  editModal: {
    setData: (data) => {},
    open: false,
    setOpen: (open) => {},
  },
});

export const TableDatContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [tableData, setTableData] = useState<GenericData[]>([]);
  const [modalEditData, setModalEditData] = useState<{
    tableName: TableName;
    data: GenericData;
  }>();
  const [openEditModal, setOpenEditModal] = useState(false);

  const deleteItem = (id: number) => {
    setTableData((prev) => {
      return [...prev.filter((item) => item.id != id)];
    });
  };
  const addItem = (item: GenericData) => {
    setTableData((prev) => {
      prev.push(item);
      return [...prev];
    });
  };
  const editItem = (item: GenericData) => {
    setTableData((prev) => {
      const editedIndex = prev.findIndex((find) => find.id == item.id);
      prev[editedIndex] = item;
      return [...prev];
    });
  };

  return (
    <tableDataContext.Provider
      value={{
        data: tableData,
        setData: setTableData,
        deleteItem,
        addItem,
        editItem,
        editModal: {
          open: openEditModal,
          setOpen: setOpenEditModal,
          setData: setModalEditData,
          data: modalEditData,
        },
      }}
    >
      {children}
    </tableDataContext.Provider>
  );
};
