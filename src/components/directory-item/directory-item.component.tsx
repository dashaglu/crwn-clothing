import { useNavigate } from "react-router-dom";

import { DirectoryCategory } from '../directory/directory.component';

import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles';

type DirectoryItemProps = {
  category: DirectoryCategory
};

const DirectoryItem = ({ category }: DirectoryItemProps) => {
    const { imageUrl, title, route } = category;

    const navigate = useNavigate();
    const navigateToCategory = () => navigate(`${route}`);

    return (
        <DirectoryItemContainer onClick={navigateToCategory}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
}

export default DirectoryItem;