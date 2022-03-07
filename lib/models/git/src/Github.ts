import GitServer from './GitServer';
import GithubRequest from './GithubRequest';

class Github extends GitServer {
  public request: any
  constructor() {
    super('github');
  }

  getUser() {
    return this.request.get('/user');
  }

  getOrg() {
    return this.request.get(`/user/orgs`, {
      page: 1,
      per_page: 100,
    });
  }

  getRepo(login:string, name:string) {
    return this.request
      .get(`/repos/${login}/${name}`)
      .then((response: any) => {
        return this.handleResponse(response);
      });
  }

  createRepo(name:string) {
    return this.request.post('/user/repos', {
      name,
    }, {
      Accept: 'application/vnd.github.v3+json',
    });
  }

  createOrgRepo(name:string, login:string) {
    return this.request.post(`/orgs/${login}/repos`, {
      name,
    }, {
      Accept: 'application/vnd.github.v3+json',
    });
  }

  setToken(token:string) {
    this.request = new GithubRequest(token);
  }

  getTokenUrl() {
    return 'https://github.com/settings/tokens';
  }

  getTokenHelpUrl() {
    return 'https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh';
  }

  getRemote(login: string, name: string) {
    return `git@github.com:${login}/${name}.git`;
  }
}

export default Github
