import PropTypes from 'prop-types';
import {Item} from './styled';
import {Link} from 'react-router-dom';
import useApi from '../../../helpers/OlxApi';

const MyAdItem = (props) => {
    const { data } = props;
    const api = useApi();
    const adData = data._doc;

    const price_value = adData.priceNegotiable ? 'Preço Negociável' : `R$ ${adData.price}`;

    // Construindo a URL da imagem
    const imageSrc = adData.images && adData.images.length > 0
                     ? api.getImageUrl(adData.images[0].url)
                     : api.getImageUrl('default.jpg');

    return (
      <Item className="aditem">
        <Link to={`/ad/${adData._id}`}>
            <div className="itemImage">
                <img src={imageSrc} alt={adData.title} />
            </div>
            <div className="itemName">{adData.title}</div>
            <div className="itemPrice">{price_value}</div>
        </Link>
      </Item>
    );
};

MyAdItem.displayName = 'MyAdItem';

MyAdItem.propTypes = {
    data: PropTypes.shape({
        _doc: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            images: PropTypes.array,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            priceNegotiable: PropTypes.bool.isRequired
        }).isRequired
    }).isRequired
};

export default MyAdItem;
