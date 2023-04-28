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

// async function post(url, data) {
//     const res = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`
//         },
//         credentials: 'include',
//         body: JSON.stringify(data),
//     });

//     console.log(res);
// }

export default { get, getQuery};