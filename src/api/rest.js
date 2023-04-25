async function get(url) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res.json();
}

async function getQuery(url, query) {
    const res = await fetch(url + '?category=' + query, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    return res.json();
}

async function post(url, value) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    });

    return res.json();
}

export default { get, getQuery, post };