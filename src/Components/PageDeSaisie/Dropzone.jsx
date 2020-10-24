import React from "react";
import DropTextArea from "react-dropzone-textarea";
import "../../style.css"

export default function App() {
  const [value, setValue] = React.useState("");
  return (
    <div>
      <label htmlFor="listePPN">Identifiants (PPN: 1 par ligne):</label>
      <DropTextArea
        value={value}
        onChange={e => setValue(e.target.value)}
        onDropRead={text => setValue(text)}
        textareaProps={{
          placeholder: "Saisissez votre liste de PPN, ou faites glisser un fichier dans la zone",
          className: "dropzoneSaisiePPN form-control",
          rows: 15,
          id: "textAreaSaisie"
        }}
      />
    </div>
  );
}
