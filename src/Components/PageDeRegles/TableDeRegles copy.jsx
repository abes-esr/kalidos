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


const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
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
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: 'All', value: products.length
    }] // A numeric array is also available. the purpose of above example is custom the text
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
