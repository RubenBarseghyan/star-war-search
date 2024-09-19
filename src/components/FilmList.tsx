import React, { useEffect, useState } from 'react';
import { Table, Pagination, Input, Select } from 'antd';
import { getFilms } from '../api/swapi';

const { Search } = Input;
const { Option } = Select;

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filterType, setFilterType] = useState('title'); // Default filter by title
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchFilms();
  }, [page]);

  const fetchFilms = async () => {
    setLoading(true);
    const data = await getFilms();
    setFilms(data.results);
    setTotal(data.count);
    setLoading(false);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title), // Sorting by title
    },
    {
      title: 'Director',
      dataIndex: 'director',
      key: 'director',
      sorter: (a, b) => a.director.localeCompare(b.director), // Sorting by director
    },
    {
      title: 'Producer',
      dataIndex: 'producer',
      key: 'producer',
      sorter: (a, b) => a.producer.localeCompare(b.producer), // Sorting by producer
    },
    {
      title: 'Release Date',
      dataIndex: 'release_date',
      key: 'release_date',
      sorter: (a, b) => new Date(a.release_date) - new Date(b.release_date), // Sorting by release date
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

  // Filter films based on the selected filter type
  const filteredFilms = films.filter((film) => {
    const searchValue = film[filterType]?.toString().toLowerCase();
    return searchValue && searchValue.includes(filter.toLowerCase());
  });

  return (
    <div>
      <h2>Films</h2>

      {/* Filter Type Selection and Search Input */}
      <div style={{ marginBottom: 16, display: 'flex', gap: '16px' }}>
        {/* Select for Filter Type */}
        <Select
          defaultValue="title"
          style={{ width: 200 }}
          onChange={handleFilterTypeChange}
        >
          <Option value="title">Title</Option>
          <Option value="director">Director</Option>
          <Option value="producer">Producer</Option>
          <Option value="release_date">Release Date</Option>
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
        dataSource={filteredFilms}
        columns={columns}
        loading={loading}
        rowKey="title"
        pagination={false} // We handle pagination below
      />

      {/* Pagination Component */}
      <Pagination
        current={page}
        total={total}
        pageSize={10} // Number of items per page
        onChange={(page) => setPage(page)}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default FilmList;
