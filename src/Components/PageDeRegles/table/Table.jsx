/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import AddIcon from '@material-ui/icons/Add';
import Modal from '../modals/Modal';
import { filtering } from './rules';
import { options, columnsSpec } from './specifications';
import { typesSpec } from './types';
import { rulesSpec } from '../generator';
import Action from './Actions';
import Add from './Add';

function Table() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rules, setRules] = useState([]);
  const [types, setTypes] = useState([]);
  const [columns, setColumns] = useState(columnsSpec);
  const { SearchBar } = Search;


  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Les règles { from} à { to} sont affichées sur un total de { size} règles
    </span>
  );

  options.paginationTotalRenderer = customTotal;

  function tooltipSearchBar() {
    return (
      <Tooltip id="button-tooltip" style={{ margin: 0 }}>
        Recherche dans la liste de règle
      </Tooltip>
    )
  }

  function newRule(rule) {
    rule.action = ""
    const newRules = rules
    newRules.unshift(rule)
    setRules(newRules)
  }

  function editRule(rule) {
    setRules(
      function (oldArray) {
        const i = oldArray.findIndex(r => r.index === rule.index);
        let before = oldArray.slice(0, i);
        let after = oldArray.slice(i + 1)
        let newArray = [
          ...before,
          {
            ...rule
          },
          ...after,
        ]
        return newArray
      }
    )
  }

  function deleteRule(index) {
    setRules(
      function (oldArray) {
        const i = oldArray.findIndex(r => r.index === index);
        let before = oldArray.slice(0, i);
        let after = oldArray.slice(i + 1)
        let newArray = [
          ...before,
          ...after,
        ]
        return newArray
      }
    )
  }

  useEffect(() => {
    fetch('/rules')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          const filtered = filtering(result);
          setRules(filtered.rules);

          let t = typesSpec(filtered.categories, rulesSpec);
          setTypes(t);

          setColumns([...columnsSpec, {
            dataField: 'action',
            text: 'Action',
            editable: false,
            searchable: false,
            headerStyle: () => ({ width: '10%', whiteSpace: 'nowrap' }),
            formatter: (cell, row) => <Action row={row} types={t} editRule={editRule} deleteRule={deleteRule} />,
          }]);

        },
        (e) => {
          setIsLoaded(true);
          setError(e);
        },
      );
  }, []);

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }
  if (!isLoaded) return <div>Chargement...</div>;

  return (
    <ToolkitProvider keyField="index" data={rules} columns={columns} search>
      {
        (props) => (
          <div>
            <div className="row">
              <div className="col-8">
                <form
                  className="d-none d-sm-inline-block form-inline mr-auto ml-md-2 my-2 my-md-0 mw-100 navbar-search"
                  style={{ border: '1px solid #e3e6f0', borderRadius: '.35rem' }}
                >
                  <div className="input-group">
                    <SearchBar {...props.searchProps} placeholder="Recherche..." className="form-control bg-light border-0 small" />
                    <div className="input-group-append">
                      <OverlayTrigger
                        placement="auto"
                        delay={{ show: 250, hide: 400 }}
                        overlay={tooltipSearchBar()}
                      >
                        <Button className="btn btn-primary">
                          <i className="fas fa-search fa-sm"></i>
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-4">
                <Modal
                  icon={ <AddIcon />}
                  textButton
                  overlay={
                  <Tooltip id="button-tooltip" style={{ margin: 0 }}>
                    Ajouter une nouvelle règle
                  </Tooltip>
                  }
                  title="Ajouter une règle"
                  body={<Add types={types} newRule={newRule} />}
                />
              </div>
            </div>
            <hr />
            <BootstrapTable {...props.baseProps} pagination={paginationFactory(options)} striped bordered hover />
          </div>
        )
      }
    </ToolkitProvider>
  );
}

export default Table;
