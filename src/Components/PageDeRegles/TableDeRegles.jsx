import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import SelectType from './SelectType'

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ModalForm from './ModalForm';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function Table() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rules, setRules] = useState([]);
  const [categories, setCategory] = useState([]);
  const { SearchBar } = Search;
  
  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    hidePageListOnlyOnePage: true,
    firstPageText: 'Premiére',
    prePageText: 'Retour',
    nextPageText: 'Suivant',
    lastPageText: 'Derniére',
    showTotal: true,
    disablePageTitle: true,
    sizePerPageList: [20, 50, 100]
  };

  const filtering = (result) => {
    let rules = []
    let c = []
    for (const category in result) { // category => {Generale, Memoire, Electronique}
      c.push(category)
      /***************************************************************
       *     IF TO REMOVE ONCE MEMORE AND ELECTRONIQUE ARE ADDED
       ***************************************************************/
      if (category == "Generale") {
        for (const type in result[category]) {
          let filter = result[category][type].map((r) => {
            if (Array.isArray(r.number))
              r.number = r.number.toString()

            r.category = category
            r.type = type
            r.action = ""
            delete r.regex
            return r
          })

          rules = rules.concat(filter)
        }
      }
    }
    setCategory(c)
    return rules
  };

  /**
   * Deletes a rule from the table
   * @param {*} row 
   */
  const deleting = (row) => {
    var headers = new Headers();
    headers.set("index", row.index)
    fetch("/rules", {
      method: 'DELETE',
      headers: headers
    })
      .then(res => console.log(res))
    setRules(rules.filter(rule => rule.index != row.index))
  }

  /**
   * Edits a row on the table
   * @param {*} row 
   */
  const editing = (row) => {
    const index = rules.findIndex(r => r.index == row.index)
    rules[index].type = document.getElementById("formType").value
    rules[index].number = document.getElementById("formNumber").value
    rules[index].code = document.getElementById("formCode").value
    rules[index].message = document.getElementById("formMessage").value
    setRules(rules)
    var headers = new Headers();
    headers.set("index", row.index)
    headers.set("Content-Type", "application/json")
    let rule = rules[index]
    delete rule.category
    delete rule.type
    delete rule.action
    fetch("/rules", {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(rule)
    })
      .then(res => console.log(res))
    console.log(rules)
  }

  const adding = () => {

  }

  const columns = [
    {
      dataField: 'category',
      text: 'Type de document',
      headerStyle: (colum, colIndex) => {
        return { width: '15%', whiteSpace: 'nowrap' };
      }
    },
    {
      dataField: 'number',
      text: 'Zone',
      headerStyle: (colum, colIndex) => {
        return { width: '10%', whiteSpace: 'nowrap' };
      }
    },
    {
      dataField: 'code',
      text: 'Sous zone',
      headerStyle: (colum, colIndex) => {
        return { width: '10%', whiteSpace: 'nowrap' };
      }
    },
    {
      dataField: 'message',
      text: 'Vérification'
    },
    {
      dataField: "action",
      text: 'Action',
      editable: false,
      searchable: false,
      headerStyle: (colum, colIndex) => {
        return { width: '10%', whiteSpace: 'nowrap'};
      },
      formatter: (cell, row) => {
        const optionsCat = categories.map(c => <option key={c}> {c} </option>)
        const editForm = (() => (
          <div>
            <Form.Group controlId="formType">
              <Form.Label>Type de document</Form.Label>
              <Form.Control as="select">{optionsCat}</Form.Control>
            </Form.Group>
            <Form.Group controlId="formNumber">
              <Form.Label>Zone</Form.Label>
              <Form.Control placeholder={row.number} defaultValue={row.number} />
            </Form.Group>
            <Form.Group controlId="formCode">
              <Form.Label>Sous zone</Form.Label>
              <Form.Control placeholder={row.code} defaultValue={row.code} />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Vérification</Form.Label>
              <Form.Control placeholder={row.message} defaultValue={row.message} />
            </Form.Group>
          </div>
        ))
        return (
          <div className="row">
            <div className="col-5 mx-auto">
              <ModalForm
                button={<EditIcon color="primary" fontSize="small" />}
                title="Edition"
                close="Annuler"
                accept="Enregistrer"
                body={() => editForm()}
                accepting={() => editing(row)}
              />
            </div>
            <div className="col-5 mx-auto">
              <ModalForm
                button={<DeleteIcon color="error" fontSize="small" />}
                title="Supprimer"
                close="Annuler"
                body="Êtes vous sûrs de vouloir supprimer cette régle ?"
                accept="Supprimer"
                accepting={() => deleting(row)}
              />
            </div>
          </div>
        )
      }
    }
  ];

  useEffect(() => {
    fetch("/rules")
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

  if (error)
    return <div>Error: {error.message}</div>;
  else if (!isLoaded)
    return <div>Loading...</div>;
  else {

    console.log(categories)
    return (
      <ToolkitProvider keyField="index" data={rules} columns={columns} search >
        {
          props => (
            <div>
              <div className="row">
                <div className="col-10">
                <SearchBar {...props.searchProps} className="align-self-center"/>
                </div>
                <div className="col-2">
                  <Modal
                    button={<AddCircleIcon fontSize="large"/>}
                    title="Ajouter une régle"
                    body={<SelectType categories={categories}/>}
                    accepting={() => console.log("ADD RULE")}
                  />
                </div>
              </div>
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
