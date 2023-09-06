class HttpRequest {
    constructor(option = {}) {
        const defaultOption = {
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            redirect: 'follow',
            referrerPolicy: 'origin'
        };

        this._baseUrl = option.baseUrl ?? '';
        // this._type = this._option.type ?? 'json';
        Reflect.deleteProperty(option, 'baseUrl');
        this._option = {
            ...defaultOption,
            ...option
        };
    }

    get(config = {}) {
        let {url = '', query = {}} = config;
        url = this._getQuery(url, query);
        return this._request(url);
    }

    _getQuery(path, query = {}) {
        let q = [];
        for (const key of Object.keys(query)) {
            const val = query[key];
            if (val !== undefined || val !== null) {
                q.push(`${key}=${val}`);
            }
        }
        return path + q.join('&');
    }

    post(config = {}, type = 'json') {
        let {url, query = {}, body = {}} = config;
        url = this._getQuery(url, query);
        const headers = this._getHeaders(type);
        if (type === 'json') {
            body = JSON.stringify(body);
        }
        const option = {
            headers,
            body,
            method: 'POST'
        };
        return this._request(url, option);
    }

    _getHeaders(type = 'json') {
        const headers = new Headers();
        switch (type) {
            case 'json':
                headers.append(
                    'Content-Type',
                    'application/json;charset=utf-8'
                );
                break;
            case 'file':
                headers.append('Content-Type', 'multipart/form-data');
                break;
            case 'form':
                break;
            default:
                break;
        }
        return headers;
    }

    put(config = {}, type = 'json') {
        let {url, query = {}, body = {}} = config;
        url = this._getQuery(url, query);
        const headers = this._getHeaders(type);
        if (type === 'json') {
            body = JSON.stringify(body);
        }
        const option = {
            headers,
            body,
            method: 'PUT'
        };
        return this._request(url, option);
    }

    delete(config = {}, type = 'json') {
        let {url, query = {}, body = {}} = config;
        url = this._getQuery(url, query);
        const headers = this._getHeaders(type);
        if (type === 'json') {
            body = JSON.stringify(body);
        }
        const option = {
            headers,
            body,
            method: 'DELETE'
        };
        return this._request(url, option);
    }

    _request(url, option = {}) {
        url = url.trim();
        const fullUrl = encodeURI(
            this._baseUrl.length > 0 ? this._baseUrl + path : path
        );
        const request = new Request(fullUrl, {
            ...this._option,
            ...option
        });
        return fetch(request)
            .then(response => {
                if (!response.ok) {
                    throw new Error(
                        `gateway error, status: ${response.status}`
                    );
                }
                return response.json();
            })
            .then(jsonData => {
                // 这里判断是不是业务code

                return jsonData.data;
            })
            .catch(() => {
                throw new Error('network error');
            });
    }

    abort(controller) {
        if (controller && controller instanceof AbortController) {
            controller.abort();
            return;
        }
        throw new Error('not a valid instance of AbortController');
    }

    getAbortController() {
        return new AbortController();
    }
}
