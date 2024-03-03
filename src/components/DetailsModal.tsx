import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useGlobalDataContext } from '../Context/GlobalDataContext';

const DetailsModal: React.FC = () => {
 const {isModalOpen, setIsModalOpen, selectedEmployee} = useGlobalDataContext()

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title="Employee Details" open={isModalOpen} onCancel={handleCancel}  footer={[
    <Button key="cancel" onClick={handleCancel}>Close</Button>
  ]}>
        <p>Name: {selectedEmployee?.name}</p>
        <p>Email: {selectedEmployee?.email}</p>
        <p>Phone: {selectedEmployee?.phone}</p>
      </Modal>
    </>
  );
};

export default DetailsModal;