import {
  ButtonItem,
  DialogButton,
  PanelSectionRow,
  TextField,
} from "decky-frontend-lib";
import folder_icon from "../assets/folder.png";
import file_icon from "../assets/file.png";
import { useState, VFC } from "react";

import { Backend } from "./service";

interface File {
  path: string;
  filename: string;
  is_dir: boolean;
}

const constructFileElement = (file: File, onClick: (e: any) => void) => {
  return (
    // <div
    //   className="folder"
    //   onClick={onClick}
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     textAlign: "center",
    //     backgroundColor: "#6A6F70",
    //     padding: "16px",
    //     borderRadius: "8px",
    //   }}
    // >
    //   <div
    //     className="folder-icon"
    //     style={{
    //       width: "64px",
    //       height: "64px",
    //       marginBottom: "8px",
    //     }}
    //   >
    //     <img src={file.is_dir ? folder_icon : file_icon} />
    //   </div>
    //   <div
    //     className="folder-name"
    //     style={{
    //       fontSize: "18px",
    //       fontWeight: "bold",
    //       color: "white",
    //     }}
    //   >
    //     {file.filename}
    //   </div>
    // </div>
    <div
      className="folder"
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#6A6F70",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      <div
        className="folder-icon"
        style={{
          width: "64px",
          height: "64px",
          marginBottom: "8px",
        }}
      >
        <img src={file.is_dir ? folder_icon : file_icon} />
      </div>
      <div
        className="folder-name"
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        {file.filename}
      </div>
    </div>
  );
};

export const FileManagerPage: VFC<{ backend: Backend }> = (props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [inputQuery, setInputQuery] = useState<string>("/home/deck");

  const getParentPath = (currentPath: string): File => {
    const parts = currentPath.split("/");
    return {
      filename: "..",
      is_dir: true,
      path: parts.slice(0, parts.length - 2).join("/"),
    };
  };

  const getFiles = async (path: string) => {
    const result = await props.backend.getFiles(path);
    if (result.success) {
      const resp = result.result;
      const files: File[] = JSON.parse(resp);

      if (files.length === 0) {
        setFiles([]);
      } else {
        // Add ".." as first element
        setFiles(
          [getParentPath(files.length > 0 ? files[0].path : "/")].concat(files)
        );
      }
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputQuery(e.currentTarget.value);
  };

  return (
    <div
      style={{
        marginTop: "50px",
        color: "white",
        overflowY: "scroll",
        height: "100vh",
        width: "100vw",
      }}
    >
      <PanelSectionRow>
        <TextField
          label="Path"
          value={inputQuery}
          onChange={onChange}
          defaultValue={"/home/deck"}
        />
        <ButtonItem
          layout="inline"
          onClick={() => {
            getFiles(inputQuery);
          }}
        >
          View Files
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <div
          className="folder-grid"
          // style={{
          // display: "grid",
          // gridTemplateColumns: "repeat(4, 1fr)",
          // gridTemplateColumns: "repeat(4, 1fr)",
          // gridGap: "16px",
          // }}
        >
          {files.map((file) => {
            return constructFileElement(file, () => {
              setInputQuery(file.path);
              getFiles(file.path);
            });
          })}
        </div>
      </PanelSectionRow>
      <DialogButton
        onClick={() => {
          const p = "/run/media";
          setInputQuery(p);
          getFiles(p);
        }}
      >
        To SD Card
      </DialogButton>
    </div>
  );
};
