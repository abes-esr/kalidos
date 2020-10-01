import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import Modal from './Modal';

const { SearchBar } = Search;

const products = [
    {
        code: 1,
        bloc: "bloc 1",
        description: "description 1",
        action: ""
    },
    {
        code: 2,
        bloc: "bloc 2",
        description: "description 2",
        action: ""
    },
    {
        code: 3,
        bloc: "bloc 3",
        description: "description 3",
        action: ""
    },
    {
        code: 4,
        bloc: "bloc 3",
        description: "description 3",
        action: ""
    },
];

const columns = [
    {
        dataField: 'code',
        text: 'Code'
    },
    {
        dataField: 'bloc',
        text: 'Bloc'
    },
    {
        dataField: 'description',
        text: 'Description'
    },
    {
        dataField: "action",
        text: 'Action',
        editable: false,
        searchable: false,
        formatter: (cell, row, rowIndex) => {
            return (
                <Modal />
            );
        }
    }
];

class Table extends React.Component{
    
}

const ListJeuDeRègles = () => (
    <ToolkitProvider keyField="code" data={products} columns={columns} search >
        {
            props => (
                <div>
                    <SearchBar {...props.searchProps} />
                    <hr />
                    <BootstrapTable {...props.baseProps} />
                </div>
            )
        }
    </ToolkitProvider>
);

class Table extends React.Component {

    render() {

    }
}

export default Table
