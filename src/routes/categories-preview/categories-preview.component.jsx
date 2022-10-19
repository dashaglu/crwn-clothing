import { useContext, Fragment } from 'react';

import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <>
            {
                Object.keys(categoriesMap).map((title) => {
                    return (
                        <Fragment key={title}>
                            <CategoryPreview title={title} products={categoriesMap[title]} />
                        </Fragment>
                    );
                })
            }
        </>
    );
}

export default CategoriesPreview;