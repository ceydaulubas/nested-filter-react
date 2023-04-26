import React, { useState } from 'react';

const Filter = ({ tasks, setFilteredTasks }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [filters, setFilters] = useState([]);
    const [filterOperation, setFilterOperation] = useState('and');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setSelectedCondition('');
        setSelectedValue('');
    };

    const handleConditionChange = (e) => {
        setSelectedCondition(e.target.value);
        setSelectedValue('');
    };

    const handleValueChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleAddFilter = () => {
        const newFilters = [...filters, { option: selectedOption, condition: selectedCondition, value: selectedValue }];
        setFilters(newFilters);
        applyFilters(newFilters);
        setSelectedOption('');
        setSelectedCondition('');
        setSelectedValue('');
    };

    const removeFilter = (index) => {
        const newFilters = filters.filter((_, i) => i !== index);
        setFilters(newFilters);
        applyFilters(newFilters);
    };

    const handleFilterOperationChange = (e) => {
        setFilterOperation(e.target.value);
        applyFilters(filters);
    };

    const applyFilters = (filtersToApply) => {
        const newFilteredTasks = tasks.filter((task) => {
            const filterResults = filtersToApply.map((filter) => {
                let condition = false;

                switch (filter.condition) {
                    case 'is':
                        condition = task[filter.option] === filter.value;
                        break;
                    case 'isNot':
                        condition = task[filter.option] !== filter.value;
                        break;
                    default:
                        break;
                }

                return condition;
            });

            return filterOperation === 'and' ? filterResults.every((result) => result) : filterResults.some((result) => result);
        });

        setFilteredTasks(newFilteredTasks);
    };

    return (
        <>
            <div className="row my-3">
                {filters.map((filter, index) => (
                    <div className="col-auto" key={index}>
                        <span className="badge bg-danger" onClick={() => removeFilter(index)}>
                            {`${filter.option} ${filter.condition} ${filter.value}`}
                            <span className="ms-2" style={{ cursor: 'pointer' }}>&times;</span>
                        </span>
                    </div>
                ))}
            </div>
            <div className="row my-3">
                <div className="col-sm-12 col-md-4 mb-3">
                    <select className="form-select" value={selectedOption} onChange={handleOptionChange}>
                        <option value="">Select an option...</option>
                        <option value="tag">Tag</option>
                        <option value="priority">Priority</option>
                        <option value="dueDate">Due date</option>
                        <option value="status">Status</option>
                    </select>
                </div>
                <div className="col-sm-12 col-md-4 mb-3">
                    <select className="form-select" value={selectedCondition} onChange={handleConditionChange} disabled={!selectedOption}>
                        <option value="">Select a condition...</option>
                        <option value="is">is</option>
                        <option value="isNot">is not</option>
                    </select>
                </div>
                <div className="col-sm-12 col-md-4 mb-3">
                    {selectedOption === 'tag' && (
                        <select className="form-select" value={selectedValue} onChange={handleValueChange} disabled={!selectedCondition}>
                            <option value="">Select a tag...</option>
                            <option value="tag1">Tag1</option>
                            <option value="tag2">Tag2</option>
                            <option value="tag3">Tag3</option>
                        </select>
                    )}
                    {selectedOption === 'priority' && (
                        <select className="form-select" value={selectedValue} onChange={handleValueChange} disabled={!selectedCondition}>
                            <option value="">Select a priority...</option>
                            <option value="Urgent">Urgent</option>
                            <option value="High">High</option>
                            <option value="Normal">Normal</option>
                            <option value="Low">Low</option>
                            <option value="NonPriority">Non Priority</option>
                        </select>
                    )}
                    {selectedOption === 'dueDate' && (
                        <select className="form-select" value={selectedValue} onChange={handleValueChange} disabled={!selectedCondition}>
                            <option value="">Select a dueDate...</option>
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="next7">Next 7 Days</option>
                            <option value="last7">Last 7 Days</option>
                            <option value="thisWeek">This Week</option>
                            <option value="lastWeek">Last Week</option>
                        </select>
                    )}
                    {selectedOption === 'status' && (
                        <select className="form-select" value={selectedValue} onChange={handleValueChange} disabled={!selectedCondition}>
                            <option value="">Select a status...</option>
                            <option value="Active">Active</option>
                            <option value="Closed">Closed</option>
                        </select>
                    )}
                </div>
                <div className="row my-3">
                    <div className="col-sm-12 col-md-4 mb-3">
                        <select className="form-select" value={filterOperation} onChange={handleFilterOperationChange}>
                            <option value="and">And</option>
                            <option value="or">Or</option>
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary mt-2" onClick={handleAddFilter} disabled={!selectedOption || !selectedCondition || !selectedValue}>
                        Add Filter
                    </button>
                </div>

            </div>
        </>
    )
}

export default Filter;

