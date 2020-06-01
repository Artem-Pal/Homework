import React, { useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { Alert } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import RequestTooltip from '../request-tooltip/request-tooltip';

const formatRequest = (request) => ({
  clientId: request.client.id,
  requestId: request.id,
  serviceIds: request.services.map((service) => service.id).join(' '),
  client: request.client,
  services: request.services,
});

const RequestTable = ({ requests }) => {
  const formattedRequests = requests && requests.map((request) => formatRequest(request));
  const [state, setState] = useState({
    columns: [
      { title: 'ID заявки', field: 'requestId', editable: 'never' },
      { title: 'ID клиента', field: 'clientId' },
      { title: 'ID услуг (можно указать несколько, разделяйте пробелом)', field: 'serviceIds' },
    ],
    data: formattedRequests,
  });
  const [alertMessage, setAlertMessage] = useState();

  const addRequest = (data) => axios.post('http://localhost:4000/api/requests', data)
    .then((response) => response.data)
    .catch((error) => {
      setAlertMessage(error.response.data.error);
      return false;
    });

  const updateRequest = (data) => axios.put(`http://localhost:4000/api/requests/${data.id}`, data)
    .then((response) => response.data)
    .catch((error) => {
      setAlertMessage(error.response.data.error);
      return false;
    });

  const deleteRequest = (data) => axios.delete(`http://localhost:4000/api/requests/${data.id}`, data)
    .then(() => true)
    .catch((error) => {
      setAlertMessage(error.response.data.error);
      return false;
    });

  return (
    <>
      <MaterialTable
        title="Requests"
        columns={state.columns}
        data={state.data}
        components={{
          EditField: (props) => (
            <TextField
              value={props.value}
              fullWidth
              multiline
              onChange={e => props.onChange(e.target.value)}
            />
          ),
        }}
        detailPanel={((rowData) => (
          <RequestTooltip rowData={rowData} />
        ))}
        editable={{
          onRowAdd: (newData) => new Promise((resolve) => {
            resolve();
            const data = [...state.data];
            const services = newData.serviceIds.replace(/\s{2,}/g, '').split(' ');
            addRequest({ client: newData.clientId, services })
              .then((response) => {
                if (response) {
                  data.push(formatRequest(response));
                }
              })
              .then(() => setState({ ...state, data }));
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve) => {
            resolve();
            if (oldData) {
              const data = [...state.data];
              const services = newData.serviceIds.replace(/\s{2,}/g, '').split(' ');
              updateRequest({ client: newData.clientId, services, id: newData.requestId })
                .then((response) => {
                  if (response) {
                    data[data.indexOf(oldData)] = formatRequest(response);
                  }
                })
                .then(() => setState({ ...state, data }));
            }
          }),
          onRowDelete: (oldData) => new Promise((resolve) => {
            resolve();
            const data = [...state.data];
            deleteRequest({ id: oldData.requestId })
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

export default React.memo(RequestTable);
