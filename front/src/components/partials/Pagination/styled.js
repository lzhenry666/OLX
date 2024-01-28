import styled from 'styled-components';
export const PaginationUl = styled.ul`
.pagination {
    display: flex;
    justify-content: center;
    padding: 20px;
    list-style: none;
  }

  .page-item {
    margin: 0 5px;
  }

  .page-link {
    border: 1px solid #ddd;
    padding: 5px 10px;
    color: #333;
    text-decoration: none;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
  }

  .page-link:hover {
    background-color: #f8f8f8;
  }

  .page-item.active .page-link {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }



`