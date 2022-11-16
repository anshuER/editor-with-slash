import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Tooltip,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { mentionValue } from "./mention/mentionValue";
import { mentionValue2 } from "./mention/mentionValue2";

import Editor from "./Editorrr";
import "./App.css";

const App = () => {
  const [openEditor, setOpenEditor] = React.useState<boolean>(false);
  const [editorValue, setEditorValue] = React.useState<any>(mentionValue);
  const [textFieldValue, setTextFieldValue] = React.useState<string>("");
  const [openEditor2, setOpenEditor2] = React.useState<boolean>(false);
  const [editorValue2, setEditorValue2] = React.useState<any>(mentionValue2);
  const [textFieldValue2, setTextFieldValue2] = React.useState<string>("");
  const [openTooltipWarning, setOpenTooltipWarning] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    console.log("editorValue", editorValue);
  }, [editorValue]);

  React.useEffect(() => {
    console.log("editorValue2", editorValue2);
  }, [editorValue2]);

  return (
    <div className="App">
      {openEditor ? (
        <div
          style={{
            border: "1px solid",
            borderRadius: "4px",
            width: "270px",
            marginLeft: "633px",
            height: "200px",
          }}
        >
          <Editor mentionValue={editorValue} setEditorValue={setEditorValue} />
          <IconButton
            onClick={() => {
              setOpenEditor(false);
            }}
            sx={{ marginLeft: "270px" }}
          >
            <OpenInFullIcon />
          </IconButton>
        </div>
      ) : (
        <OutlinedInput
          value={textFieldValue}
          onChange={(e) => {
            setTextFieldValue(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  textFieldValue
                    ? setOpenTooltipWarning(true)
                    : setOpenEditor(true)
                }
              >
                <Tooltip
                  open={openTooltipWarning}
                  // onClose={() => setOpenTooltipWarning(false)}
                  title={
                    textFieldValue
                      ? "To open the editor first remove the text"
                      : "Click to open the editor"
                  }
                >
                  <OpenInFullIcon />
                </Tooltip>
              </IconButton>
            </InputAdornment>
          }
        />
      )}
      {/* <p>{editorValue}</p> */}
      {/* {openEditor2 ? (
        <div
          style={{
            border: "1px solid",
            borderRadius: "4px",
            width: "270px",
            marginLeft: "633px",
            height: "200px",
          }}
        >
          <Editor
            mentionValue={editorValue2}
            setEditorValue={setEditorValue2}
          />
          <IconButton
            onClick={() => {
              setOpenEditor2(false);
            }}
            sx={{ marginLeft: "470px" }}
          >
            <OpenInFullIcon />
          </IconButton>
        </div>
      ) : (
        <OutlinedInput
          value={textFieldValue2}
          onChange={(e) => {
            setTextFieldValue2(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  textFieldValue2
                    ? setOpenTooltipWarning(true)
                    : setOpenEditor2(true)
                }
              >
                <Tooltip
                  open={openTooltipWarning}
                  // onClose={() => setOpenTooltipWarning(false)}
                  title={
                    textFieldValue2
                      ? "To open the editor first remove the text"
                      : "Click to open the editor"
                  }
                >
                  <OpenInFullIcon />
                </Tooltip>
              </IconButton>
            </InputAdornment>
          }
        />
      )} */}
    </div>
  );
};

export default App;

// import {
//   InputLabel,
//   OutlinedInput,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import React from "react";
// import Editor from "./Editorrr";
// import OpenInFullIcon from "@mui/icons-material/OpenInFull";

// class App extends React.Component {
//   render() {
//     const [openEditor, setOpenEditor] = React.useState<boolean>(false);
//     return (
//       <div className="App">
//         <InputLabel>Editor</InputLabel>
//         <OutlinedInput
//           endAdornment={
//             <InputAdornment position="end">
//               <IconButton aria-label="toggle password visibility" edge="end">
//                 <OpenInFullIcon />
//               </IconButton>
//             </InputAdornment>
//           }
//           label="Password"
//         />
//         <Editor />
//       </div>
//     );
//   }
// }

// export default App;
