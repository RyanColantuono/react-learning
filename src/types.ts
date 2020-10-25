export interface MenuItem {
    id: number;
    name: string;
    image: string;
    desc: string;
    price: number;
}

export interface OrderItem {
    menuItemId: number;
    quantity: number;
}

export interface Order {
    orderId: number;
    orderedItems:  OrderItem[];
    orderDate: Date;
}

export interface MenuAndOrders {
    menuItems: MenuItem[];
    currentOrder:  OrderItem[];
    previousOrders: Order[];
}

