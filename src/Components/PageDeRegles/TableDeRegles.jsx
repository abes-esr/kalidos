import React from 'react';
import Modal from './Modal';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

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
    {
        code: 12,
        bloc: "bloc 1",
        description: "description 1",
        action: ""
    },
    {
        code: 5,
        bloc: "bloc 2",
        description: "description 2",
        action: ""
    },
    {
        code: 6,
        bloc: "bloc 3",
        description: "description 3",
        action: ""
    },
    {
        code: 7,
        bloc: "bloc 3",
        description: "description 3",
        action: ""
    },
    {
        code: 8,
        bloc: "bloc 1",
        description: "description 1",
        action: ""
    },
    {
        code: 9,
        bloc: "bloc 2",
        description: "description 2",
        action: ""
    },
    {
        code: 10,
        bloc: "bloc 3",
        description: "description 3",
        action: ""
    },
    {
        code: 11,
        bloc: "bloc 3",
        description: "description 3",
        action: ""
    },
];

const action = () => (
    <div>
        <Modal 
            button="X" 
            buttonColor="danger"
            title="Delete" 
            close="Cancel" 
            accept="Delete rule" 
            accepting={() => console.log("delete rule")}
        />
        <Modal 
            button="V"
            buttonColor="primary" 
            title="Edit" 
            close="Cancel" 
            accept="Save changes" 
            accepting={() => console.log("edit rule")}
        />
    </div>
);

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
            return action;
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
  

const Table = () => (
    <ToolkitProvider keyField="code" data={products} columns={columns} search >
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

export default Table

class Table extends React.Component {
    
}