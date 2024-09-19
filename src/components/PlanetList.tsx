import React, { useEffect, useState } from 'react';
import { Table, Pagination, Input, Select } from 'antd';
import { getPlanets } from '../api/swapi';

const { Search } = Input;
const { Option } = Select;

const PlanetList = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filterType, setFilterType] = useState('name'); // Default filter by name
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchPlanets();
  }, [page]);

  const fetchPlanets = async () => {
    setLoading(true);
    const data = await getPlanets(page);
    setPlanets(data.results);
    setTotal(data.count);
    setLoading(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name), // Sorting by name
    },
    {
      title: 'Climate',
      dataIndex: 'climate',
      key: 'climate',
      sorter: (a, b) => a.climate.localeCompare(b.climate), // Sorting by climate
    },
    {
      title: 'Gravity',
      dataIndex: 'gravity',
      key: 'gravity',
      sorter: (a, b) => parseFloat(a.gravity) - parseFloat(b.gravity), // Sorting by gravity (converted to number)
    },
  ];

  // Handle filter input change
  const onSearch = (value) => {
    setFilter(value);
  };

  // Handle filter type change
  const handleFilterTypeChange = (value) => {
    setFilterType(value);
  };

  // Filter planets based on the selected filter type
  const filteredPlanets = planets.filter((planet) => {
    const searchValue = planet[filterType]?.toString().toLowerCase();
    return searchValue && searchValue.includes(filter.toLowerCase());
  });

  return (
    <div>
      <h2>Planets</h2>

      <div style={{ marginBottom: 16, display: 'flex', gap: '16px' }}>
        {/* Filter Type Selection */}
        <Select
          defaultValue="name"
          style={{ width: 200 }}
          onChange={handleFilterTypeChange}
        >
          <Option value="name">Name</Option>
          <Option value="climate">Climate</Option>
          <Option value="gravity">Gravity</Option>
        </Select>

        {/* Search Input */}
        <Search
          placeholder={`Filter by ${filterType}`}
          onSearch={onSearch}
          enterButton
          allowClear
          style={{ flex: 1 }}
        />
      </div>

      {/* Data Table */}
      <Table
        dataSource={filteredPlanets}
        columns={columns}
        loading={loading}
        rowKey="name"
        pagination={false}
      />

      {/* Pagination */}
      <Pagination
        current={page}
        total={total}
        pageSize={10}
        onChange={(page) => setPage(page)}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default PlanetList;
