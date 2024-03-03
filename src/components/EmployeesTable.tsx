"use client";
import React, { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import EmptyEmployeeTable from "./EmptyEmployeeTable";
import { EditableCellProps, tableItem } from "../interfaces/interfaces";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";
import { useGlobalDataContext } from "../Context/GlobalDataContext";

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
  const {data, setData, isLoading} = useGlobalDataContext()

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");


 
  const isEditing = (record: tableItem) => record.key === editingKey;

  const edit = (record: Partial<tableItem> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as tableItem;
      const updatedItemIndex = data.findIndex((item) => key === item.key);
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];

        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        console.log(newData[updatedItemIndex]);
        setEditingKey("");
        toast.success("Saved Successfully!!");
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
    const newData = data.map((item) => {
      if (item.key === key) {
        console.log("blocked item", item);
        return { ...item, isBlocked: !item.isBlocked };
      }

      return item;
    });

    setData(newData);
    toast.success("Employee Blocked Successfully!!");
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    toast.success("Employee Deleted Successfully!!");
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "email",
      dataIndex: "email",
      width: "30%",
      editable: false,
    },
    {
      title: "phone",
      dataIndex: "phone",
      width: "25%",
      editable: true,
    },
    
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: tableItem) => {
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
                title={`Sure to ${record.isBlocked ? "unblock" : "block"}?`}
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
      onCell: (record: tableItem) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  if (isLoading) {
    return (
      <div className="w-full h-full m-auto">
        <LoadingSpinner />
      </div>
    );
  }
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
