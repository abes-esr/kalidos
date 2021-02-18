
export const options = {
  paginationSize: 4,
  pageStartIndex: 1,
  hidePageListOnlyOnePage: true,
  firstPageText: 'Premiére',
  prePageText: 'Retour',
  nextPageText: 'Suivant',
  lastPageText: 'Derniére',
  showTotal: true,
  disablePageTitle: true,
  sizePerPageList: [20, 50, 100]
};

export const columnsSpec =  [
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
]
