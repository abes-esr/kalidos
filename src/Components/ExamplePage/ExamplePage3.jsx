import React from 'react';
import {fakeData} from '../fakedata.json'

console.log("fakedata"  + {fakeData})
const ExamplePage3 = () => (
    <div>
        <h2>ExamplePage3</h2>

<h1 class="mt-3" style={{color: "#4E73DF"}}>PPN : 12345 </h1>
<div class="card-group">

<div class="card ml-2" style={{backgroundColor: "#F0F1F2", maxWidth: "18rem", borderBottom:"1px solid #8781E0"}}>
{/*<div class="card-header">Sun Gone</div>*/}
<div class="card-body">
<h5 class="card-title" style={{color: "#db6060"}}>Erreur 200</h5>
<p class="card-text" style={{color: "#547be5"}}>je suis un message</p>
<p class="card-text" style={{color: "#db6060"}}><small class="text-muted">b</small></p>
</div>
</div>

<div class="card ml-2" style={{backgroundColor: "#F0F1F2", maxWidth: "18rem", borderBottom:"1px solid #8781E0"}}>
{/*<div class="card-header">Sun Gone</div>*/}
<div class="card-body">
<h5 class="card-title" style={{color: "#db6060"}}>Erreur 350</h5>
<p class="card-text" style={{color: "#547be5"}}>Comment ça va</p>
<p class="card-text" style={{color: "#db6060"}}><small class="text-muted">f</small></p>
</div>
</div>


</div>




<h1 class="mt-3" style={{color: "#4E73DF"}}>PPN : 6789 </h1>
<div class="card-group">

<div class="card ml-2" style={{backgroundColor: "#F0F1F2", maxWidth: "18rem", borderBottom:"1px solid #8781E0"}}>
{/*<div class="card-header">Sun Gone</div>*/}
<div class="card-body">
<h5 class="card-title" style={{color: "#db6060"}}>Erreur 500</h5>
<p class="card-text" style={{color: "#547be5"}}>Bonjour</p>
<p class="card-text" style={{color: "#db6060"}}><small class="text-muted">c</small></p>
</div>
</div>

</div>





</div>

);

export default ExamplePage3;
