import PropTypes from 'prop-types';
import {PaginationUl} from './styled';
const Pagination = ({ adsPerPage, totalAds, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAds / adsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationUl>
    <nav>
        <ul  className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#!" className='page-link'>
              {number}
            </a>
          </li>
        ))}
        </ul>
    </nav>
    </PaginationUl>

  );
};


Pagination.propTypes = {
    adsPerPage: PropTypes.number.isRequired,
    totalAds: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
};

export default  Pagination