
import React from 'react';


const ExamplePage2 = () => (
    <div>
        <h2>Interface de résultat Démo </h2>
        <table className="table table-condensed tab-collapse">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Credit</th>
                    <th>Debit</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                <tr data-toggle="collapse" data-target="#demo1" className="accordion-toggle">
                    <td>1</td>
                    <td>05 May 2013</td>
                    <td>Credit Account</td>
                    <td className="text-success">$150.00</td>
                    <td className="text-error"></td>
                    <td className="text-success">$150.00</td>
                </tr>
                <tr >
                    <td colSpan="6" className="hiddenRow"><div className="accordian-body collapse" id="demo1"> Demo1 </div> </td>
                </tr>
                <tr data-toggle="collapse" data-target="#demo2" className="accordion-toggle">
                    <td>2</td>
                    <td>05 May 2013</td>
                    <td>Credit Account</td>
                    <td className="text-success">$11.00</td>
                    <td className="text-error"></td>
                    <td className="text-success">$161.00</td>
                </tr>
                <tr>
                    <td colSpan="6" className="hiddenRow"><div id="demo2" className="accordian-body collapse">Demo2</div></td>
                </tr>
                <tr data-toggle="collapse" data-target="#demo3" className="accordion-toggle">
                    <td>3</td>
                    <td>05 May 2013</td>
                    <td>Credit Account</td>
                    <td className="text-success">$500.00</td>
                    <td className="text-error"></td>
                    <td className="text-success">$661.00</td>
                </tr>
                <tr>
                    <td colSpan="6"  className="hiddenRow"><div id="demo3" className="accordian-body collapse">Demo3</div></td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default ExamplePage2;
