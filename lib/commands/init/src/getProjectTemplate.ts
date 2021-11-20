import { request } from '@js-cli/utils'

export default function() {
    return request({
        url: '/project/template'
    })
}