import React from 'react';
import './styles.css';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const EmployeeTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.Employees);
  const getClassNamesFor = (firstName) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === firstName ? sortConfig.direction : undefined;
  };
  return (
      <table>
      <caption>Employees</caption>
      <thead>
        <tr>
            <th>
                <button
                type="button"
                onClick={() => requestSort('id')}
                className={getClassNamesFor('id')}
                >
                Employee ID
                </button>
            </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('firstName')}
              className={getClassNamesFor('firstName')}
            >
              First Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('lastName')}
              className={getClassNamesFor('lastName')}
            >
              Last Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('salary')}
              className={getClassNamesFor('salary')}
            >
              Salary
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('department')}
              className={getClassNamesFor('department')}
            >
              Department
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>${item.salary}</td>
            <td>{item.department}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function App() {
  return (
    <div className="App">
      <EmployeeTable
        Employees={[
          { id: 1, firstName: 'Frodo', lastName: 'Baggins', salary: 99.99, department: "Shire" },
          { id: 2, firstName: 'Samwise',  lastName: 'Gamgee', salary: 89.99, department: "Shire" },
          { id: 3, firstName: 'Meriadoc', lastName: 'Brandybuck', salary: 79.99, department: "Shire" },
          { id: 4, firstName: 'Peregrin', lastName: 'Took', salary: 79.99, department: "Shire" },
          { id: 5, firstName: 'Gandalf', lastName: 'The White', salary: 99.99, department: "Wizards" },
          { id: 6, firstName: 'Aragorn', lastName: 'Son of Arathorn', salary: 99.99, department: "Gondor" },
          { id: 7, firstName: 'Legolas', lastName: 'Greenleaf', salary: 89.99, department: "Elves" },
          { id: 8, firstName: 'Gimli', lastName: 'Son of Gloin', salary: 89.99, department: "Dwarves" },
          { id: 9, firstName: 'Boromir', lastName: 'Son of Denethor', salary: 89.99, department: "Gondor" },
        ]}
      />
    </div>
  );
}
