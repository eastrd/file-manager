import {
  ButtonItem,
  definePlugin,
  PanelSection,
  PanelSectionRow,
  Router,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import { VFC } from "react";
import { FaShip } from "react-icons/fa";

import { Backend } from "./service";
import { FileManagerPage } from "./FileManager";

const Content: VFC<{}> = () => {
  return (
    <PanelSection title="File Manager">
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

export default definePlugin((serverApi: ServerAPI) => {
  const backend = new Backend(serverApi);

  serverApi.routerHook.addRoute(
    "/filemanager",
    () => <FileManagerPage backend={backend} />,
    {
      exact: true,
      backend,
    }
  );

  return {
    title: <div className={staticClasses.Title}>Example Plugin</div>,
    content: <Content />,
    icon: <FaShip />,
    onDismount() {
      serverApi.routerHook.removeRoute("/filemanager");
    },
  };
});
