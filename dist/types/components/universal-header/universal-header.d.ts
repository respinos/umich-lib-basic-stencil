export declare class UniversalHeader {
    isOpen: boolean;
    isLoaded: boolean;
    data: any;
    error: boolean;
    el: HTMLElement;
    transformData(data: any): {
        primary: any;
        secondary: any;
    };
    handleClick(event: any): void;
    setError(value: any): void;
    setData(value: any): void;
    componentDidLoad(): void;
    render(): any;
}
