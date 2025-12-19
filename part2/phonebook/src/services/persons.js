import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newPersonObject) => {
    return axios.post(baseUrl, newPersonObject)
}

const remove = (personObject) => {
    return axios.delete(`${baseUrl}/${personObject.id}`)
}

export default { getAll, create, remove }