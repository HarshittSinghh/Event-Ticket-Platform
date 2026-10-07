const API_URL = "http://localhost:8080/api/auth";

export async function login(username, password) {

    const response = await fetch(
        `${API_URL}/login?username=${username}&password=${password}`,
        {
            method: "POST"
        }
    );

    if (!response.ok) {
        throw new Error("Invalid username or password");
    }

    return response.json();
}