import { useEffect, useState } from 'react'
import Employee from '../interfaces/Employee'
import { generateAPI } from '../config/ApiGenerate'
import AsyncSelect from 'react-select/async';
import { employeeApis } from "../config/apis/Employee"

interface EmployeeSelectProps {
    allOptions?: Employee[]
    selectedOption?: Employee
    onSelectOption: Function
}
interface OptionType {
    id: number
    name: string


}

export default function EmployeeSelect(props: EmployeeSelectProps) {
    const [allOptions, setAllOptions] = useState<boolean>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    console.log('EmployeeSelect loading', isLoading)

    useEffect(() => {

        const api = employeeApis.getAllEmployees;
        generateAPI(api)!
            .then((response) => {
                console.log('EmployeeSelect useEffect', response.data)

                let employeesResponse
                if (response.data.success) {
                    employeesResponse = response.data.employees.map((employee: Employee) => {

                        employee.createdAt = new Date(employee.createdAt)
                        employee.updatedAt = new Date(employee.updatedAt)
                        return employee
                    })
                }

                setAllOptions(employeesResponse)
                setIsLoading(false)
            })
    }, [])

    const formatOptionLabel = (option: OptionType) => (
        <div>
            <div>{option.name}</div>

        </div>
    );

    return (
        <>
            <div className="flex">
                <p>Employee: </p>
                <AsyncSelect
                    className="w-full"
                    isLoading={isLoading}
                    isClearable={false}
                    isSearchable={false}
                    formatOptionLabel={formatOptionLabel}
                    defaultOptions={allOptions}
                    placeholder={''}
                    onChange={(e) => props.onSelectOption(e)}
                />
            </div>
        </>
    )
}