import React, { useState } from 'react';

const Filter = ({ tasks, setFilteredTasks }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [filterGroups, setFilterGroups] = useState([{ filters: [], filterOperation: 'and', subGroups: [] }]);

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
        const newFilter = { option: selectedOption, condition: selectedCondition, value: selectedValue };
        const updatedFilterGroups = filterGroups.map((group, index) => {
            if (index === filterGroups.length - 1 && group.filters.length < 5) {
                return { ...group, filters: [...group.filters, newFilter] };
            }
            return group;
        });
        setFilterGroups(updatedFilterGroups);
        applyFilters(updatedFilterGroups);
        setSelectedOption('');
        setSelectedCondition('');
        setSelectedValue('');
    };

    const handleAddGroup = () => {
        if (filterGroups.length < 4 && filterGroups.every((group) => group.filters.length > 0)) {
            setFilterGroups([...filterGroups, { filters: [], filterOperation: 'and', subGroups: [] }]);
        }
    };

    const removeFilter = (groupIndex, filterIndex) => {
        const updatedFilterGroups = filterGroups.map((group, index) => {
            if (index === groupIndex) {
                return { ...group, filters: group.filters.filter((_, i) => i !== filterIndex) };
            }
            return group;
        }).filter((group, index) => index === 0 || group.filters.length > 0);
        setFilterGroups(updatedFilterGroups);
        applyFilters(updatedFilterGroups);
    };

    const handleFilterOperationChange = (e, groupIndex) => {
        const updatedFilterGroups = filterGroups.map((group, index) => {
            if (index === groupIndex) {
                return { ...group, filterOperation: e.target.value };
            }
            return group;
        });
        setFilterGroups(updatedFilterGroups);
        applyFilters(updatedFilterGroups);
    };

    const applyFilters = (updatedFilterGroups) => {
        const newFilteredTasks = tasks.filter((task) => {
            const groupResults = updatedFilterGroups.map((group) => {
                if (group.filters.length === 0) {
                    return true;
                }

                const filterResults = group.filters.map((filter) => {
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

                return group.filterOperation === 'and'
                    ? filterResults.every((result) => result)
                    : filterResults.some((result) => result);
            });

            return groupResults.every((result) => result);
        });

        setFilteredTasks(newFilteredTasks);
    };


    return (
        <div className="container my-3 border p-3">
            <h5>Filters</h5>
            <div className="mt-3">
                {filterGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="mb-2">
                        <div className="row">
                            <div className="col-auto">
                                <span className="text-muted">Where</span>
                            </div>
                            <div className="col">
                                <div className="d-inline-flex">
                                    {group.filters.map((filter, filterIndex) => (
                                        <span key={filterIndex} className="badge bg-danger me-2" onClick={() => removeFilter(groupIndex, filterIndex)}>
                                            {`${filter.option} ${filter.condition} ${filter.value}`}
                                            <span className="ms-2" style={{ cursor: 'pointer' }}>&times;</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <select className="form-select" value={selectedOption} onChange={handleOptionChange}>
                                    <option value="">Select option</option>
                                    <option value="tag">Tag</option>
                                    <option value="priority">Priority</option>
                                    <option value="dueDate">Due date</option>
                                    <option value="status">Status</option>
                                </select>
                            </div>
                            <div className="col">
                                <select className="form-select" value={selectedCondition} onChange={handleConditionChange} disabled={!selectedOption}>
                                    <option value="">Select condition</option>
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
                        </div>
                        <div className="row">
                            <div className="col mt-2">
                                <select className="form-select"
                                    value={group.filterOperation}
                                    onChange={(e) => handleFilterOperationChange(e, groupIndex)}
                                    style={{ width: '80px' }}
                                >
                                    <option value="and">And</option>
                                    <option value="or">Or</option>
                                </select>
                            </div>
                        </div>
                        {groupIndex > 0 && (
                            <div className="row">
                                <div className="col-auto">
                                    <span className="text-muted">Group {groupIndex + 1}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="col-12">
                <button className="btn btn-primary mt-2" onClick={handleAddFilter} disabled={!selectedOption || !selectedCondition || !selectedValue}>
                    Add Filter
                </button>
                {filterGroups.length === 1 && filterGroups[0].filters.length > 0 && (
                    <button className="btn btn-secondary mt-2 ms-2" onClick={handleAddGroup}>
                        Add Group
                    </button>
                )}
            </div>
        </div>

    );
};

export default Filter;