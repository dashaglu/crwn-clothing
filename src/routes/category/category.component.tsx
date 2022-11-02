import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";

import {
    selectCategoriesMap,
    selectCategoriesIsLoading
} from "../../store/categories/categories.selector";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import { CategoryContainer, CategoryTitle } from "./category.styles";
import { CategoryItem } from '../../store/categories/categories.types';

type CategoryRouteParams = {
    category: string;
};


const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState<CategoryItem[]>(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            {
                isLoading
                    ? <Spinner />
                    : <>
                        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
                        <CategoryContainer>
                            {
                                products && products.map((product) => <ProductCard key={product.id} product={product} />)
                            }
                        </CategoryContainer>
                    </>
            }
        </>
    );
};

export default Category;