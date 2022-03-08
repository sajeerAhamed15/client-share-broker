export async function getAllCompany() {
    const response = await fetch(`http://localhost:9191/v1/company/get-all`,
        {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }
    );

    return response.ok && response.json();
}

export async function getAllCurrency() {
    const response = await fetch(`http://localhost:9191/v1/currency/get-all`,
        {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }
    );

    return response.ok && response.json();
}

export async function getAllUser() {
    const response = await fetch(`http://localhost:9191/v1/user/get-all`,
        {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }
    );

    return response.ok && response.json();
}

export async function updateExchangeRate() {
    const response = await fetch(`http://localhost:9191/v1/currency/update-exchange-rate`,
        {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }
    );

    return response.ok;
}

export async function updateSharePrice() {
    const response = await fetch(`http://localhost:9191/v1/company/update-share-price`,
        {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }
    );

    return response.ok;
}

export async function createCompany(item: any) {
    const response = await fetch(`http://localhost:9191/v1/company/create`,
        {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        }
    );

    return response.ok;
}

export async function createCurrency(item: any) {
    const response = await fetch(`http://localhost:9191/v1/currency/create`,
        {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        }
    );

    return response.ok;
}