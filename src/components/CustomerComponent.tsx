import react, { useState } from 'react'
import Customer from '../interfaces/Customer'
import { generateAPI } from '../config/ApiGenerate'
import AsyncSelect from 'react-select/async';
import { customerApis } from "../config/apis/Customer"
import { ActionMeta, SingleValue } from 'react-select/dist/declarations/src/types';
interface CustomerComponentProps {
    customers?: Customer[]
    selectedCustomer?: Customer
    onSelectCustomer: Function
}
interface OptionType {
    name: string
    phone: string[]
    address: string[]
}
export default function CustomerComponent(props: CustomerComponentProps) {
    const [customers, setCustomers] = useState<Customer[]>();

    console.log('CustomerComponent', props)

    const loadOptions = (inputValue: string, callback: Function) => {
        // Perform an API request to fetch options based on inputValue

        if (inputValue.length < 2) {
            callback([])
            return;
        }

        const api = customerApis.searchCustomer;
        api.params = { search_text: inputValue }
        generateAPI(api)!
            .then((response) => {
                console.log('loadOptions', response.data)

                let customersResponse
                if (response.data.success) {
                    customersResponse = response.data.customers.map((customer: Customer) => {


                        customer.created_at = new Date(customer.created_at)
                        customer.updated_at = new Date(customer.updated_at)
                        return customer
                    })
                }

                setCustomers(customersResponse)

                callback(customersResponse);
            })
            .catch((error) => {
                console.error('Error fetching options:', error);
                callback([]);
            });
    };
    const formatOptionLabel = (option: OptionType) => (
        <div>
            <div>{option.name}</div>
            <div style={{ fontSize: '12px', color: 'gray' }}>
                <p>{option.phone[0]}</p>
                <p>{option.address[0]}</p>
            </div>
        </div>
    );

    return (
        <>
            <div className="flex">
                <p>Customer: </p>
                <AsyncSelect
                    className="w-full"
                    isLoading={false}
                    isClearable
                    isSearchable
                    loadOptions={loadOptions}
                    formatOptionLabel={formatOptionLabel}
                    defaultOptions={customers}
                    placeholder={''}
                    onChange={(e) => props.onSelectCustomer(e)}
                />
            </div>
        </>
    )
}