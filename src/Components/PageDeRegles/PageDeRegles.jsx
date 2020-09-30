import React from 'react';
// import Card6 from '../Générique/Card_6';
import Card12 from '../Générique/Card_12';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar } = Search;


const products = [
    {
        id : 1,
        owner : "owner 1",
        type : "type 1",
        action : ""
    },
    {
        id : 2,
        owner : "owner 2",
        type : "type 2",
        action : ""
    },
    {
        id : 3,
        owner : "owner 3",
        type : "type 3",
        action : ""
    },
    {
        id : 4,
        owner : "owner 3",
        type : "type 3",
        action : ""
    },
];

const columns = [
    {
        dataField: 'id',
        text: 'Job ID',
        searchable: false,
        hidden: true
    },
    {
        dataField: 'owner',
        text: 'Job Owner'
    },
    {
        dataField: 'type',
        text: 'Job Type'
    },
    {
        dataField: "action",
        text: 'Job Action',
        editable : false,
        formatter: (cell, row, rowIndex) => {
            return (
                <div>
                    <button className="btn btn-secondary btn-xs" onClick={() => console.log(row)}>
                        Edit
                    </button>
                    <button className="btn btn-danger btn-xs" onClick={deleteRow(row.id)}>
                        Delete
                    </button>
                </div>
            );
        }
    }
];

// const deleteRow = function(row){
//     const index = products.findIndex( (e) => e.id = row);
//     if (index > -1)
//         products.splice(index, 1);
//     console.log(products);
// }

const ListJeuDeRègles = () => (
    <ToolkitProvider keyField="id" data={products} columns={columns} search >
        {
            props => (
                <div>
                    <SearchBar {...props.searchProps} />
                    <hr />
                    <BootstrapTable id="tableRegles" {...props.baseProps} />
                </div>
            )
        }
    </ToolkitProvider>
);

const PageDeSaisie = () => (
    <div>
        <h2>Jeu de règles</h2>
        <br></br>
        <div className="row">
            <Card12 title={'Jeu de règles'} content={ListJeuDeRègles} />
        </div>
    </div>
);


export default PageDeSaisie;
