export const customerOrderApis = {
    createCustomerOrder: {
        url: "/customer-order",
        method: "POST",
        data: {
            action: '',
            customer_id: 0,
            total_quantity: 0,
            discount: 0,
            vat: 0,
            total_amount: 0,
            amount_paid: 0,
            amount_pending: 0,
            comments: '',
            employee_id: 0,
            delivery_date: ''
        },
    },

}
