export function saveUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user))
}

export function saveCurrentCompany(company: any) {
    localStorage.setItem("currentCompany", JSON.stringify(company))
}

export function getCurrentCompany() {
    return localStorage.getItem("currentCompany")
}

export function isUserLoggedIn() {
    const localUser = localStorage.getItem("user");
    const user = JSON.parse(localUser!);
    return user && user.name;
}

export function getUserId() {
    const localUser = localStorage.getItem("user");
    const user = JSON.parse(localUser!);
    return user.id;
}