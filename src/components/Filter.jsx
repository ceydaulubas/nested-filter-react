import React, { useState } from 'react';

const Filter = ({ tasks, setFilteredTasks }) => {
    const [filterGroups, setFilterGroups] = useState([{ tag: '', priority: '', dueDate: '', status: '' }]);

    const handleFilterChange = (index, field, value) => {
        const newFilterGroups = [...filterGroups];
        newFilterGroups[index][field] = value;
        setFilterGroups(newFilterGroups);
    };

    const handleAddFilterGroup = () => {
        setFilterGroups([...filterGroups, { tag: '', priority: '', dueDate: '', status: '' }]);
    };

    const handleRemoveFilterGroup = (index) => {
        const newFilterGroups = [...filterGroups];
        newFilterGroups.splice(index, 1);
        setFilterGroups(newFilterGroups);
    };

    const handleApplyFilter = () => {
        let filteredTasks = [...tasks];

        filterGroups.forEach((filterGroup) => {
            filteredTasks = filteredTasks.filter((task) => {
                let match = true;

                if (filterGroup.tag) {
                    match = match && task.tag === filterGroup.tag;
                }
                if (filterGroup.priority) {
                    match = match && task.priority === filterGroup.priority;
                }
                if (filterGroup.dueDate) {
                    // TODO: implement due date filtering logic
                }
                if (filterGroup.status) {
                    match = match && task.status === filterGroup.status;
                }

                return match;
            });
        });

        setFilteredTasks(filteredTasks);
    };

    return (
        <div className="my-3 p-3 bg-white rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Filters</h6>
                <button className="btn btn-sm btn-primary" onClick={handleApplyFilter}>
                    Apply Filter
                </button>
            </div>

            {filterGroups.map((filterGroup, index) => (
                <div key={index} className="border rounded p-3 mb-3">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-danger" onClick={() => handleRemoveFilterGroup(index)}>
                            Remove Filter
                        </button>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label className="form-label">Tag</label>
                                <select className="form-select" value={filterGroup.tag} onChange={(e) => handleFilterChange(index, 'tag', e.target.value)}>
                                    <option value="">--Select--</option>
                                    <option value="tag1">Tag 1</option>
                                    <option value="tag2">Tag 2</option>
                                    <option value="tag3">Tag 3</option>
                                    <option value="tag4">Tag 4</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="mb-3">
                                <label className="form-label">Priority</label>
                                <select className="form-select" value={filterGroup.priority} onChange={(e) => handleFilterChange(index, 'priority', e.target.value)}>
                                    <option value="">--Select--</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="High">High</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Low">Low</option>
                                    <option value="NonPriority">Non Priority</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label className="form-label">Due Date</label>
                                <select className="form-select" value={filterGroup.dueDate} onChange={(e) => handleFilterChange(index, 'dueDate', e.target.value)}>
                                    <option value="">--Select--</option>
                                    <option value="today">Today</option>
                                    <option value="yesterday">Yesterday</option>
                                    <option value="tomorrow">Tomorrow</option>
                                    <option value="next7">Next 7 Days</option>
                                    <option value="last7">Last 7 Days</option>
                                    <option value="thisWeek">This Week</option>
                                    <option value="lastWeek">Last Week</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select className="form-select" value={filterGroup.status} onChange={(e) => handleFilterChange(index, 'status', e.target.value)}>
                                    <option value="">--Select--</option>
                                    <option value="Active">Active</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="d-flex justify-content-end">
                <button className="btn btn-sm btn-secondary" onClick={handleAddFilterGroup}>
                    Add Filter
                </button>
            </div>
        </div>
    );
};

export default Filter;