
const EnvData = {
    REACT_APP_UPLOAD_LIMIT: process.env.REACT_APP_UPLOAD_LIMIT  || 10,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'https://backend.wyreng.com/api/v1/',
    REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://backend.wyreng.com/'
}

export default EnvData;