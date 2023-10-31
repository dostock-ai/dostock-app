export interface CurrentSelectedTemplate {
    [key: string]: [
        {
            name: string,
            sale_price: number,
            buy_price: number,
            description: string,
            barcode: string,
            type_sale: string,
            available_for_sale: boolean,
            control_stock: boolean,
            current_stock: number,
            image_url: string
        }
    ];
}
