import React from "react";
import DropTextArea from "react-dropzone-textarea";
import "../../style.css"

export default function App() {
  const [value, setValue] = React.useState("");
  return (
    <div>
      <label htmlFor="listePPN">Identifiants (1 PPN par ligne) :</label>
      <DropTextArea
        value={value}
        onChange={e => setValue(e.target.value)}
        onDropRead={text => setValue(text)}
        textareaProps={{
          placeholder: "Saisissez votre liste de PPN, ou faites glisser un fichier dans la zone",
          className: "dropzoneSaisiePPN form-control",
          rows: 10,
          id: "textAreaSaisie"
        }}
      />
    </div>
  );
}
