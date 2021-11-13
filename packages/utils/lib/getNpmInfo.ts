import axios from 'axios'
import urlJoin from 'url-join'
import semver from 'semver'
import semverSort from 'semver-sort'

export interface NpmInfoData {
    versions: string[]
}
function getNpmInfo(npmName: string, registry: string) {
    if (!npmName) {
        return null
    }
    const registryUrl = registry || getDefaultRegistry()
    const npmInfoUrl = urlJoin(registryUrl, npmName)
    return axios.get<NpmInfoData>(npmInfoUrl).then(response => {
        if (response.status === 200) {
            return response.data
        }
    }).catch((err: any) => {
        return Promise.reject(err)
    })
}

const getDefaultRegistry = (isOriginal = false) => {
    return isOriginal ? 'https://registry.npm.taobao.org' : 'https://registry.npmjs.org'
}

const getNpmVersions = async (appName: string, registry: string) => {
    const data = await getNpmInfo(appName, registry)
    if (data) {
        return Object.keys(data.versions)
    } else {
        return []
    }
}

export const getNpmSemverVersion = async (baseVersion: string, npmName: string, registry = '') => {
    const versions = await getNpmVersions(npmName, registry)
    const newVersions = getSemverVersions(baseVersion, versions)
    if (newVersions && newVersions.length > 0) {
        return newVersions[0]
    }
    return null
}

const getSemverVersions = (baseVersion: string, versions: string[]) => {
    return semverSort.desc(versions.filter(version =>
        semver.satisfies(version, `^${baseVersion}`)
    ))
}