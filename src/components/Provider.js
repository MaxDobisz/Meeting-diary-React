export default class API{
    url = 'http://localhost:3005/meetings/';

    insert(data) {
        return fetch(this.url, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {"Content-Type": "application/json"}
                })
                .then(resp => {
                    if(resp.ok) { return resp.json(); }
                    return Promise.reject(resp);
                })
    }

    delete(data) {
        return fetch(`${this.url}${data}`, {
                    method: "DELETE",
                })
                .then(resp => {
                    if(resp.ok) { return resp.json(); }
                    return Promise.reject(resp);
                })
    }

    get() {
        return fetch(this.url)
            .then(resp => {
                if(resp.ok) { return resp.json(); }
                return Promise.reject(resp);
            })
    }

}