class QueryString {

    private query: URLSearchParams;

    constructor() {
        this.query = new URLSearchParams(window.location.search); 
    }

    public get(key: string, defaultValue: string): string {
        return this.query.get(key) ?? defaultValue;
    }

    public set(key: string, value: string): void {
        this.query.set(key, value);
        
        this.syncToUrl();
    }

    public syncToUrl(): void {
        window.history.replaceState({}, "", `?${this.query.toString()}`);
    }
}

export default QueryString;