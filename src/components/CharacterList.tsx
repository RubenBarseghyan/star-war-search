import React, { useEffect, useState } from 'react';
import { Table, Pagination, Input, Select } from 'antd';
import { getCharacters } from '../api/swapi';

const { Search } = Input;
const { Option } = Select;

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filterType, setFilterType] = useState('name');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const fetchCharacters = async () => {
    setLoading(true);
    const data = await getCharacters(page);
    setCharacters(data.results);
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
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
      sorter: (a, b) => parseInt(a.height) - parseInt(b.height), // Sorting by height (converted to number)
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender), // Sorting by gender
    },
    {
      title: 'Eye Color',
      dataIndex: 'eye_color',
      key: 'eye_color',
      sorter: (a, b) => a.eye_color.localeCompare(b.eye_color), // Sorting by eye color
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

  // Filter characters based on the selected filter type
  const filteredCharacters = characters.filter((character) => {
    const searchValue = character[filterType]?.toString().toLowerCase();
    return searchValue && searchValue.includes(filter.toLowerCase());
  });

  return (
    <div>
      <h2>Characters</h2>

      <div style={{ marginBottom: 16, display: 'flex', gap: '16px' }}>
        {/* Filter Type Selection */}
        <Select
          defaultValue="name"
          style={{ width: 200 }}
          onChange={handleFilterTypeChange}
        >
          <Option value="name">Name</Option>
          <Option value="height">Height</Option>
          <Option value="gender">Gender</Option>
          <Option value="eye_color">Eye Color</Option>
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
        dataSource={filteredCharacters}
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

export default CharacterList;
