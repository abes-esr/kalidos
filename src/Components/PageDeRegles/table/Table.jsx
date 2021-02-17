/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { AddCircle } from '@material-ui/icons';
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
  // const [categories, setCategory] = useState([]);
  const [types, setTypes] = useState([]);
  const [columns, setColumns] = useState(columnsSpec);
  const { SearchBar } = Search;

  const newRule = function (rule) {
    rule.action = ""
    const newRules = rules
    newRules.unshift(rule)
    setRules(newRules)
  }

  function editRule(rule) {
    console.log(rule)
    console.log("avant")
    console.log(rules)
    setRules(
    function(oldArray){
      const i = oldArray.findIndex(r => r.index === rule.index);
      console.log("i "+ i)
      return [
        oldArray.splice(0, i - 1),
        {
          ...rule
        },
        oldArray.splice(i + 1),
      ]
      // const newArray = oldArray;
      // newArray[i] = rule;
      // console.log(newArray);
      // setRules(newArray)
    })
    console.log("apres")
    console.log(rules)
  }
  
  useEffect(() => {
    fetch('/rules')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          const filtered = filtering(result);
          setRules(filtered.rules);
          // setCategory(filtered.categories);
          const t = typesSpec(filtered.categories, rulesSpec);
          setColumns([...columnsSpec, {
            dataField: 'action',
            text: 'Action',
            editable: false,
            searchable: false,
            headerStyle: () => ({ width: '10%', whiteSpace: 'nowrap' }),
            formatter: (cell, row) => <Action row={row} types={t} editRule={editRule}/>,
          }]);
          setTypes(t);
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
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <ToolkitProvider keyField="index" data={rules} columns={columns} search>
      {
          (props) => (
            <div>
              <div className="row">
                <div className="col-10">
                  <SearchBar {...props.searchProps} className="align-self-center" />
                </div>
                <div className="col-2">
                  <Modal
                    button={<AddCircle fontSize="large" />}
                    title="Ajouter une régle"
                    // body="{<SelectType categories={categories}/>}"
                    body={<Add types={types} newRule={newRule}/>}
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

export default Table;
