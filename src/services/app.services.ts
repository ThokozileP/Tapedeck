export class AppService {
    public async getBrands(): Promise<any> {
        const response = await fetch('/api')
        return await response.json()
    }
}