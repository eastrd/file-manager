import {
  ButtonItem,
  definePlugin,
  DialogButton,
  Menu,
  MenuItem,
  PanelSection,
  PanelSectionRow,
  Router,
  ServerAPI,
  showContextMenu,
  staticClasses,
} from "decky-frontend-lib";
import { useState, VFC } from "react";
import { FaShip } from "react-icons/fa";

import logo from "../assets/logo.png";
import { Backend } from "./service";

const Content: VFC<{ backend: Backend }> = (props) => {
  const [files, setFiles] = useState<string | undefined>();

  const onClick = async () => {
    const result = await props.backend.getFiles();
    if (result.success) {
      setFiles(result.result);
    }
  };

  return (
    <PanelSection title="File Manager">
      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={(e) =>
            showContextMenu(
              <Menu label="Menu" cancelText="CAAAANCEL" onCancel={() => {}}>
                <MenuItem onSelected={() => {}}>Item #1</MenuItem>
                <MenuItem onSelected={() => {}}>Item #2</MenuItem>
                <MenuItem onSelected={() => {}}>Item #3</MenuItem>
              </Menu>,
              e.currentTarget ?? window
            )
          }
        >
          Server says yolo
        </ButtonItem>
        <ButtonItem onClick={onClick}>Show Files {files}</ButtonItem>
      </PanelSectionRow>

      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => {
            Router.CloseSideMenus();
            Router.Navigate("/filemanager");
          }}
        >
          File Manager
        </ButtonItem>
      </PanelSectionRow>
    </PanelSection>
  );
};

const FileManagerPage: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      <PanelSectionRow>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} />
        </div>
      </PanelSectionRow>
      <DialogButton onClick={() => Router.NavigateToLibraryTab()}>
        Go to Library
      </DialogButton>
    </div>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  const backend = new Backend(serverApi);

  serverApi.routerHook.addRoute("/filemanager", FileManagerPage, {
    exact: true,
  });

  return {
    title: <div className={staticClasses.Title}>Example Plugin</div>,
    content: <Content backend={backend} />,
    icon: <FaShip />,
    onDismount() {
      serverApi.routerHook.removeRoute("/filemanager");
    },
  };
});
