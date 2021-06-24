var BaseURL = 'http://localhost:3001'


const getData = async url => {
    try {
        const response = await fetch(`${BaseURL}/${url}`);
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e);
        throw new Error('Something Went Wrong!');
    }
}
export { getData, BaseURL };
