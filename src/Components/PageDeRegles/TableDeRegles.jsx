import React, {useState, useEffect} from 'react';
import Modal from './Modal';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Col, Container, Row } from 'react-bootstrap';

const { SearchBar } = Search;

const columns = [
    {
      dataField: 'type',
      text: 'type'
    },
    {
        dataField: 'number',
        text: 'number',
        headerStyle: (colum, colIndex) => {
          return { width: '100px'};
        }
    },
    {
        dataField: 'code',
        text: 'code',
        headerStyle: (colum, colIndex) => {
          return { width: '80px'};
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
        formatter: (cell, row, rowIndex) => {
          return (
            <Container>
              <Row>
                <Col>
                  <Modal 
                    button="X" 
                    buttonColor="danger"
                    title="Delete" 
                    close="Cancel" 
                    accept="Delete rule" 
                    accepting={() => console.log("delete rule")}
                  />
                </Col>
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
              </Row>
            </Container>            
          )
        }
    }
];
  
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

const filtering = (result) =>{
  let rules = []
  for (const type in result) { // type => {Generale, Memoire, Electronique}
    /***************************************************************
     *     IF TO REMOVE ONCE MEMORE AND ELECTRONIQUE ARE ADDED
     ***************************************************************/
    if ( type == "Generale" ) { 
      for (const property in result[type]) {
      console.log(property + " " + result[type][property].length)
      let filter = result[type][property].map(r => {
        r.type = type
        r.action = ""
        delete r.index
        delete r.regex
        return r
      })

      rules = rules.concat(filter)
      }
    }
  }
  return rules
};

function Table() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rules, setRules] = useState([]);

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
      <ToolkitProvider keyField="code" data={rules} columns={columns} search >
      {
          props => (
              <div>
                  <SearchBar {...props.searchProps} />
                  <hr />
                  <BootstrapTable {...props.baseProps}  pagination={ paginationFactory(options) } />
              </div>
          )
      }
      </ToolkitProvider>
    );
  }

};

export default Table

