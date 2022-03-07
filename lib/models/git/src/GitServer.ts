abstract class GitServer {
  public type: string
  public token!: string
  constructor(type: string) {
    this.type = type;
  }
  setToken(token: string) {
    this.token = token;
  }
  abstract createRepo(name: string): void

  abstract createOrgRepo(name: string, login: string): void

  abstract getRemote(login: string, name: string): string

  abstract getUser(): void

  abstract getOrg(username?: string): any

  abstract getRepo(login: string, name: string): void

  abstract getTokenUrl(): void

  abstract getTokenHelpUrl(): void

  isHttpResponse = (response: any) => {
    return response && response.status;
  };

  handleResponse = (response: any) => {
    if (this.isHttpResponse(response) && response !== 200) {
      return null;
    } else {
      return response;
    }
  };
}

export default GitServer
