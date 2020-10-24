import React, { useState, useEffect } from 'react';
import Modal from './Modal';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Col, Container, Row } from 'react-bootstrap';

function Table() {
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rules, setRules] = useState([]);
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
    for (const type in result) { // type => {Generale, Memoire, Electronique}
      /***************************************************************
       *     IF TO REMOVE ONCE MEMORE AND ELECTRONIQUE ARE ADDED
       ***************************************************************/
      if (type == "Generale") {
        for (const property in result[type]) {
          let filter = result[type][property].map((r) => {
            r.type = type
            r.action = ""
            delete r.regex
            return r
          })

          rules = rules.concat(filter)
        }
      }
    }
    return rules
  };

  const deleting = (row) => {
    setRules(rules.filter(rule => rule.index != row.index))
    console.log(rules)
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
        console.log(cell)
        console.log(row)
        console.log(rowIndex)
        return (
          <Container fluid>
            <Row>
              <Col>
                <Modal
                  button="V"
                  buttonColor="primary"
                  title="Edit"
                  close="Cancel"
                  accept="Save changes"
                  accepting={() => console.log("edit rule")}
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
