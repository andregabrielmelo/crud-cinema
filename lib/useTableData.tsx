"use client";

import { createContext, useContext, useState } from "react";
import { GenericData } from "./definitions";

export const useTableData = () => useContext(tableDataContext);
type tableDataContextType = {
  data: GenericData[];
  deleteItem: (id: number) => void;
  addItem: (item: GenericData) => void;
  editItem: (item: GenericData) => void;
  setData: (newData: GenericData[]) => void;
};
const tableDataContext = createContext<tableDataContextType>({
  data: [],
  deleteItem: (id) => {},
  editItem: (item) => {},
  addItem: (item) => {},
  setData: (newData) => {},
});

export const TableDatContextProvider = ({ children }) => {
  const [tableData, setTableData] = useState<GenericData[]>([]);
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
      const editedIndex = prev.findIndex((find) => (find.id = item.id));
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
      }}
    >
      {children}
    </tableDataContext.Provider>
  );
};
