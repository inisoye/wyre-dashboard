

export const isEmpty = (value) => (
    value === undefined
    || value === null
    || (typeof value === 'object' && Object.keys(value).length === 0)
    || (typeof value === 'string' && value.trim().length === 0)
);


const logoutOnUnauthorized = (error) => {
    const errorData = isEmpty(error?.response.data) ? error?.response
        : error?.response.data;

    if (
        !isEmpty(errorData)
        && errorData?.status === 401
        && ((errorData?.statusText === 'Unauthorized')
            || (errorData?.error === 'Unauthorized' && errorData?.message === 'Unauthorized')
            || (isEmpty(errorData?.data) && isEmpty(errorData?.statusText)))
    ) {
        window.localStorage.removeItem('loggedWyreUser');
        window.location.href = '/';
    }
};


export { logoutOnUnauthorized };


