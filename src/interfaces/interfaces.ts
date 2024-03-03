export interface tableItem {
    key: string;
    name: string;
    email: string;
    phone: string;
    isBlocked: boolean;
    _id: string;
  }
  

  //EDITABLE CELL PROPS INTERFACE
  export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text" | "boolean";
    record: tableItem;
    index: number;
    children: React.ReactNode;
  }
  

//CONTEXT API PROPS

export interface DataContextProviderProps {
  children: React.ReactNode;
}
export interface DataContextValue {
  data: tableItem[];
  isLoading: boolean;
  setData: React.Dispatch<React.SetStateAction<tableItem[]>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEmployee: tableItem | undefined;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<tableItem | undefined>>;
  displayContent: React.ReactNode;
  setDisplayContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  handleMenuChange: (key: string) => void;
  selectedKey: string;
  setSelectedKey: React.Dispatch<React.SetStateAction<string>>;
}
