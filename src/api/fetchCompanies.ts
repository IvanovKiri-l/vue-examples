const url = 'https://bnzdevback.jp-api.ru/api/catalog/companies'

export const fetchCompanies = async () => {
    return await fetch(url).then(res => res.json())
}