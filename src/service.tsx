import { ServerAPI } from "decky-frontend-lib";

interface AddMethodArgs {
  left: number;
  right: number;
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
}
