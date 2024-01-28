import PropTypes from 'prop-types';
import {Item} from './styled';
import {Link} from 'react-router-dom';

const AdItem = (props) => {
    const { data } = props;
    let price_value = '';
    if (data.priceNegotiable) {
        price_value = 'Preço Negociável';
    } else {
        price_value = `R$ ${data.price}`;
    }
    return (
      <Item className="aditem">
        <Link to={`/ad/${data.id}`}>
            <div className="itemImage">
                <img src={data.image} alt="" />
            </div>
            <div className="itemName">{data.title}</div>
            <div className="itemPrice">{price_value}</div>
        </Link>
      </Item>
    );
};

AdItem.displayName = 'AdItem';

AdItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        priceNegotiable: PropTypes.bool.isRequired
    }).isRequired
};

export default AdItem;
