import axios from 'axios';
import { log } from '@js-cli/utils'

interface CreateComponentType {
  component: any,
  git: {
    type: string,
    remote: string,
    version: string,
    branch: string,
    login: string,
    owner: string,
  },
}
export const createComponent = async (component: CreateComponentType) => {
  try {
    const response = await axios.post('http://1.116.156.44:8085/api/v1/components', component);
    log.verbose('response', response as unknown as string);
    const { data } = response;
    if (data.code === 0) {
      return data.data;
    }
    return null;
  } catch (e) {
    throw e;
  }
}

