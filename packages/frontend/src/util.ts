export async function http(
    request: RequestInfo
): Promise<any> {
    const response = await fetch(request);
    return await response.json();
}
