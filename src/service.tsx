import { ServerAPI } from "decky-frontend-lib";

interface AddMethodArgs {
  left: number;
  right: number;
}

interface ListFilesArgs {
  path: string;
}

export class Backend {
  private serverAPI: ServerAPI;

  constructor(serverAPI: ServerAPI) {
    this.serverAPI = serverAPI;
  }

  async doAdd() {
    return this.serverAPI.callPluginMethod<AddMethodArgs, number>("add", {
      left: 2,
      right: 2,
    });
  }

  async getFiles(path: string) {
    return this.serverAPI.callPluginMethod<ListFilesArgs, string>(
      "list_files",
      {
        path,
      }
    );
  }
}
