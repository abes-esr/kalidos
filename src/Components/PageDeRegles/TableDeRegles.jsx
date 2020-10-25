import React, { useState, useEffect } from 'react';
import Modal from './Modal';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import ModalForm from './ModalForm';

function Table() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rules, setRules] = useState([]);
  const [types, setTypes] = useState([]);
  const { SearchBar } = Search;

  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    hidePageListOnlyOnePage: true,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    disablePageTitle: true,
    sizePerPageList: [5, 10, 20, 50, 100]
  };

  const filtering = (result) => {
    let rules = []
    let types = []
    for (const type in result) { // type => {Generale, Memoire, Electronique}
      types.push(type)
      /***************************************************************
       *     IF TO REMOVE ONCE MEMORE AND ELECTRONIQUE ARE ADDED
       ***************************************************************/
      if (type == "Generale") {
        for (const property in result[type]) {
          let filter = result[type][property].map((r) => {
            if (Array.isArray(r.number))
              r.number = r.number.toString()

            r.type = type
            r.action = ""
            delete r.regex
            return r
          })

          rules = rules.concat(filter)
        }
      }
    }
    setTypes(types)
    return rules
  };

  const deleting = (row) => {
    setRules(rules.filter(rule => rule.index != row.index))
  }

  const accepting = (row) => {
    const index = rules.findIndex(r => r.index == row.index)
    let tmp = rules;
    tmp[index].type = document.getElementById("formType").value
    tmp[index].number = document.getElementById("formNumber").value
    tmp[index].code = document.getElementById("formCode").value
    tmp[index].message = document.getElementById("formMessage").value
    console.log(tmp[index])
    setRules(tmp)
  }

  const columns = [
    {
      dataField: 'type',
      text: 'type',
      headerStyle: (colum, colIndex) => {
        return { width: '15%', whiteSpace: 'nowrap' };
      }
    },
    {
      dataField: 'number',
      text: 'number',
      headerStyle: (colum, colIndex) => {
        return { width: '10%', whiteSpace: 'nowrap' };
      }
    },
    {
      dataField: 'code',
      text: 'code',
      headerStyle: (colum, colIndex) => {
        return { width: '10%', whiteSpace: 'nowrap' };
      }
    },
    {
      dataField: 'message',
      text: 'message'
    },
    {
      dataField: "action",
      text: 'Action',
      editable: false,
      searchable: false,
      headerStyle: (colum, colIndex) => {
        return { width: '10%', whiteSpace: 'nowrap' };
      },
      formatter: (cell, row, rowIndex) => {
        const optionsType = types.map(type => <option key={type}> {type} </option>)
        const editForm = (() => (
          <div>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control as="select">{optionsType}</Form.Control>
            </Form.Group>
            <Form.Group controlId="formNumber">
              <Form.Label>Number</Form.Label>
              <Form.Control placeholder={row.number} defaultValue={row.number} />
            </Form.Group>
            <Form.Group controlId="formCode">
              <Form.Label>Code</Form.Label>
              <Form.Control placeholder={row.code} defaultValue={row.code} />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control placeholder={row.message} defaultValue={row.message} />
            </Form.Group>
          </div>
        ))
        return (
          <Container fluid>
            <Row>
              <Col>
                <ModalForm
                  button="V"
                  buttonColor="primary"
                  title="Edit"
                  close="Cancel"
                  accept="Save changes"
                  body={editForm()}
                  accepting={() => accepting(row)}
                />
              </Col>
              <Col>
                <Modal
                  button="X"
                  buttonColor="danger"
                  title="Delete"
                  close="Cancel"
                  body="Are you sure you want to delete this rule?"
                  accept="Delete rule"
                  accepting={() => deleting(row)}
                />
              </Col>
            </Row>
          </Container>
        )
      }
    }
  ];

  useEffect(() => {
    fetch("http://localhost:3000/rules")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRules(filtering(result));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ToolkitProvider keyField="index" data={rules} columns={columns} search >
        {
          props => (
            <div>
              <SearchBar {...props.searchProps} />
              <Button className="float-right" variant="primary" onClick={() => console.log("Adding rule")}>
                Add Rule
                </Button>
              <hr />
              <BootstrapTable {...props.baseProps} pagination={paginationFactory(options)} />

            </div>
          )
        }
      </ToolkitProvider>
    );
  }

};

export default Table
