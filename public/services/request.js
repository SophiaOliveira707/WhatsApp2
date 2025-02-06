const ip = '10.88.1.85';

export async function request(route,data){
    const url = 'http://' + ip + route;
    const response = await fetch(url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    return {
        status: response.status,
        data: await response.json()
    };
}