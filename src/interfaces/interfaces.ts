export interface tableItem {
    key: string;
    name: string;
    isBlocked: boolean;
    email: string;
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
  