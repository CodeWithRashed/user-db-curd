"use client";
import React, { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import EmptyEmployeeTable from "./EmptyEmployeeTable";

interface Item {
  key: string;
  name: string;
  age: number;
  isBlocked: boolean;
  address: string;

}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text" | "boolean";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EmployeeTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  const fetchData = async () => {
    const originData: Item[] = [];
    for (let i = 0; i < 5; i++) {
      originData.push({
        key: i.toString(),
        name: `Edward ${i}`,
        age: 32,
        isBlocked: false,
        address: `London Park no. ${i}`,
      });
    }

    setData(originData);
    // try {
    //     const response = await axios.get('your-api-endpoint');
    //     setData(response.data);
    // } catch (error) {
    //     console.error('Error fetching data:', error);
    // }
  };

  //GETTING DATA FROM DATABASE
  React.useEffect(() => {
    fetchData();
  }, []);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleBlock = (key: React.Key) => {
    const newData = data.map(item => {
      if (item.key === key) {
        return { ...item, isBlocked: !item.isBlocked };
      }
      return item;
    });
    setData(newData);
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };




  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "age",
      dataIndex: "age",
      width: "15%",
      editable: true,
    },
    {
      title: "address",
      dataIndex: "address",
      width: "40%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div>
            <span className="edit-button">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            </span>
            <span className="block-button ml-3">
              <Popconfirm
                title="Sure to block?"
                onConfirm={() => handleBlock(record.key)}
                okText="Yes"
                cancelText="No"
              >
                <Typography.Link disabled={editingKey !== ""}>
                  {record.isBlocked ? "unblock" : "block"}
                </Typography.Link>
              </Popconfirm>
            </span>
            <span className="delete-button ml-3">
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.key)}
                okText="Yes"
                cancelText="No"
              >
                <Typography.Link disabled={editingKey !== ""}>
                  Delete
                </Typography.Link>
              </Popconfirm>
            </span>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  if (!data) {
    return (
      <div className="flex justify-center items-center h-full w-full my-auto">
        <EmptyEmployeeTable />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default EmployeeTable;
