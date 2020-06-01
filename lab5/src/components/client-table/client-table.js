import React, { useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { Alert } from '@material-ui/lab';

const ClientTable = ({ clients }) => {
  const [state, setState] = useState({
    columns: [
      { title: 'ID клиента', field: 'id', editable: 'never' },
      { title: 'Полное имя', field: 'fullName' },
      { title: 'Возраст', field: 'age' },
      { title: 'Город', field: 'city' },
      { title: 'Номер телефона', field: 'phoneNumber' },
    ],
    data: clients,
  });
  const [alertMessage, setAlertMessage] = useState();

  const addClient = (data) => axios.post('http://localhost:4000/api/clients', data)
    .then((response) => response.data)
    .catch((error) => {
      setAlertMessage(error.response.data.error);
      return false;
    });

  const updateClient = (data) => axios.put(`http://localhost:4000/api/clients/${data.id}`, data)
    .then((response) => response.data)
    .catch((error) => {
      setAlertMessage(error.response.data.error);
      return false;
    });

  const deleteClient = (data) => axios.delete(`http://localhost:4000/api/clients/${data.id}`, data)
    .then(() => true)
    .catch((error) => {
      setAlertMessage(error.response.data.error);
      return false;
    });

  return (
    <>
      <MaterialTable
        title="Clients"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) => new Promise((resolve) => {
            resolve();
            const data = [...state.data];
            addClient(newData)
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
              updateClient(newData)
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
            deleteClient(oldData)
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

export default React.memo(ClientTable);
