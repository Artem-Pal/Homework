import React, { useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { Alert } from '@material-ui/lab';

const ServiceTable = ({ services }) => {
  const [state, setState] = useState({
    columns: [
      { title: 'ID услуги', field: 'id', editable: 'never' },
      { title: 'Название', field: 'name' },
      { title: 'Цена', field: 'price' },
      { title: 'Описание', field: 'description' },
    ],
    data: services,
  });
  const [alertMessage, setAlertMessage] = useState();

  const addService = (data) => axios.post('http://localhost:4000/api/services', data)
    .then((response) => response.data)
    .catch((error) => {
      setAlertMessage(error.response.data.error);
      return false;
    });

  const updateService = (data) => axios.put(`http://localhost:4000/api/services/${data.id}`, data)
    .then((response) => response.data)
    .catch((error) => {
      setAlertMessage(error.response.data.error);
      return false;
    });

  const deleteService = (data) => axios.delete(`http://localhost:4000/api/services/${data.id}`, data)
    .then(() => true)
    .catch((error) => {
      setAlertMessage(error.response.data.error);
      return false;
    });

  return (
    <>
      <MaterialTable
        title="Services"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) => new Promise((resolve) => {
            resolve();
            const data = [...state.data];
            addService(newData)
              .then((response) => {
                if (response) {
                  data.push(response);
                }
              })
              .then(() => setState({ ...state, data }));
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve) => {
            resolve();
            if (oldData) {
              const data = [...state.data];
              updateService(newData)
                .then((response) => {
                  if (response) {
                    data[data.indexOf(oldData)] = response;
                  }
                })
                .then(() => setState({ ...state, data }));
            }
          }),
          onRowDelete: (oldData) => new Promise((resolve) => {
            resolve();
            const data = [...state.data];
            deleteService(oldData)
              .then((response) => {
                if (response) {
                  data.splice(data.indexOf(oldData), 1);
                }
              })
              .then(() => setState({ ...state, data }));
          }),
        }}
      />
      {
        alertMessage ? (
          <Alert className="mt-2" severity="error" onClose={() => setAlertMessage(null)}>{alertMessage}</Alert>
        ) : null
      }
    </>
  );
};

export default React.memo(ServiceTable);
