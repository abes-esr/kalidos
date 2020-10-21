import React from 'react';
import Card6 from '../Générique/Card_6';
import fakedata from '../fakedata.json';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    result: state.result,
    compteurResult: state.compteurResult,
  });


const mapDispatchToProps = (dispatch) => ({
  });

let idTr = 0;

function TabMessage({errors, compteurResult}){
    return (
        <div>
            <table className="table table-bordered" width="100%" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Message d'erreur</th>
                        <th>Numéro</th>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                {
                    errors.map((error) => {
                        idTr+=1;
                        return (
                            <tr key={idTr}>
                                <td>{error.message}</td>
                                <td>{error.number}</td>
                                <td>{error.code}</td>
                            </tr>
                        );
                })
                }
                </tbody>
            </table>
        </div>
    );
}

let idCard6 = 0;

function TempInterfaceVerif({result}) {
    window.result=result;
    console.log(result);
    const data = Object.keys(result).map((key) => [Number(key), result[key]]);
    return (
    <div>
        <h2>Interface de Verification</h2>
        <br></br>
        <div className="row">
        {
            data.map((row) => {
                idCard6 +=1;
                return(
                    <Card6 key={idCard6} title={'PPN : ' + row[1].PPN} content={<TabMessage errors={row[1].errors} />}/>
                );
            })
        }
        </div>
    </div>
    );
}

// export default TempInterfaceVerif;
// export default connect(mapStateToProps)(TempInterfaceVerif);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TempInterfaceVerif));

