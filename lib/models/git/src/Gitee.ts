import GitServer from './GitServer';
import GiteeRequest from './GiteeRequest';

class Gitee extends GitServer {
  public request: any
  constructor() {
    super('gitee');
  }
  getUser() {
    return this.request.get('/user');
  }

  getOrg(username: string) {
    return this.request.get(`/users/${username}/orgs`, {
      page: 1,
      per_page: 100,
    });
  }

  getRepo(login:string, name:string) {
    return new Promise((resolve, reject) => {
      this.request
        .get(`/repos/${login}/${name}`)
        .then((response: any) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            resolve(null)
          }
        })
        .catch((err: any) => reject(err));
    });
  }

  createRepo(name:string) {
    return this.request.post('/user/repos', {
      name,
    });
  }

  createOrgRepo(name:string, login:string) {
    return this.request.post(`/orgs/${login}/repos`, {
      name,
    });
  }

  setToken(token:string) {
    this.request = new GiteeRequest(token);
  }

  getTokenUrl() {
    return 'https://gitee.com/personal_access_tokens';
  }

  getTokenHelpUrl() {
    return 'https://gitee.com/help/articles/4191';
  }

  getRemote(login: string, name: string) {
    return `git@gitee.com:${login}/${name}.git`;
  }
}

export default Gitee
