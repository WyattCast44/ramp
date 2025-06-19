import Extension from "./Extension";

class Extensions
{
    /**
     * The registered extensions map.
     */
    private extensions = new Map();

    /**
     * The initialized state of the extensions.
     */
    private initialized = false;

    public has(extension: string | string[]): boolean {
        if (Array.isArray(extension)) {
            return extension.every((ext) => this.has(ext));
        }

        return this.extensions.has(extension);
    }

    public register(extension: Extension | Extension[]): void {
        if (Array.isArray(extension)) {
            extension.forEach((ext) => this.register(ext));
            return;
        }

        // verify that the given item is an extension
        if(!(extension instanceof Extension)) {
            throw new Error("Invalid extension given: " + extension);
        }

        this.extensions.set(extension.name, extension);

        // if we are already initilized, we need to init this extension
        if(this.initialized) {
            extension.init();
        }
    }

    public initExtensions(): void {
        for(const [_, value] of this.extensions) {
            value.init();
        }

        this.initialized = true;
    }

    public callExtensionMethodIfExists(method: string): void {
        if(!this.initialized) {
            throw new Error("You must init before calling this method");
        }

        for(const [_, value] of this.extensions) {
            if(typeof value[method] === "function") {
                value[method]();
            }
        }
    }
}

export default Extensions;
