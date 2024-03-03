"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";

import { EditableCellProps, tableItem } from "../interfaces/interfaces";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";
import { useGlobalDataContext } from "../Context/GlobalDataContext";
import DetailsModal from "./DetailsModal";
import axios from "axios";
import EmptyEmployeeTable from "./EmptyEmployeeTable";

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
  const { data, setData, isLoading, setIsModalOpen, setSelectedEmployee } =
    useGlobalDataContext();
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

  const save = async (record: tableItem) => {
    try {
      const row = (await form.validateFields()) as tableItem;
      const updatedItemIndex = data.findIndex(
        (item) => record.key === item.key
      );
      const newData = [...data];
      const index = newData.findIndex((item) => record.key === item.key);
      if (index > -1) {
        const item = newData[index];

        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        axios.put(`/api/employee/put/${record._id}`, row).then(() => {
          setData(newData);
          console.log(newData[updatedItemIndex]);
          setEditingKey("");
          toast.success("Saved Successfully!!");
        });
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleBlock = (record: tableItem) => {
    const newData = data.map((item) => {
      if (item.key === record.key) {
        console.log("blocked item", item);
        return { ...item, isBlocked: !item.isBlocked };
      }

      return item;
    });

    setData(newData);
    axios
      .put(`/api/employee/put/${record._id}`, { isBlocked: !record.isBlocked })
      .then(() => {
        toast.success("Employee Blocked Successfully!!");
      });
  };

  const handleDelete = (record: tableItem) => {
    const newData = data.filter((item) => item.key !== record.key);
    setData(newData);

    axios.delete(`/api/employee/delete/${record._id}`).then(() => {
      toast.success("Employee Deleted Successfully!!");
    });
  };

  const handleViewDetails = (record: tableItem) => {
    setSelectedEmployee(record);
    setIsModalOpen(true);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      editable: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "20%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "30%",
      editable: false,
    },
    {
      title: "Actions",
      dataIndex: "operation",
      width: "30%",
      render: (_: any, record: tableItem) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
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
            <span className="view-button mr-3">
              <Typography.Link
                onClick={() => handleViewDetails(record)}
                disabled={editingKey !== ""}
              >
                Details
              </Typography.Link>
            </span>
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
                title={`Sure to ${record.isBlocked ? "Unblock" : "Block"}?`}
                onConfirm={() => handleBlock(record)}
                okText="Yes"
                cancelText="No"
              >
                <Typography.Link disabled={editingKey !== ""}>
                  {record.isBlocked ? "Unblock" : "Block"}
                </Typography.Link>
              </Popconfirm>
            </span>
            <span className="delete-button ml-3">
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record)}
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
        inputType: col.dataIndex === "phone" ? "number" : "text",
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
  if (!data.length) {
    return (
      <div className="flex justify-center items-center h-full w-full my-auto">
        <EmptyEmployeeTable />
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-x-scroll">
      <DetailsModal />
      <div className="min-w-[500px]">
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
    </div>
  );
};

export default EmployeeTable;
