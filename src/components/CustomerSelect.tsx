import { useState } from 'react'
import Customer from '../interfaces/Customer'
import { generateAPI } from '../config/ApiGenerate'
import AsyncSelect from 'react-select/async';
import { customerApis } from "../config/apis/Customer"

interface CustomerSelectProps {
    allOptions?: Customer[]
    selectedOption?: Customer
    onSelectOption: Function
}
interface OptionType {
    id: number
    name: string
    phone: string[]
    address: string[]
}

export default function CustomerSelect(props: CustomerSelectProps) {
    const [allOptions, setAllOptions] = useState<Customer[]>();

    console.log('CustomerSelect props', props)

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


                        customer.createdAt = new Date(customer.createdAt)
                        customer.updatedAt = new Date(customer.updatedAt)
                        return customer
                    })
                }

                setAllOptions(customersResponse)

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
                    defaultOptions={allOptions}
                    placeholder={''}
                    onChange={(e) => props.onSelectOption(e)}
                />
            </div>
        </>
    )
}