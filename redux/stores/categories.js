import men_categories from '../../public/static/men/header_content.json';
import women_categories from '../../public/static/women/header_content.json';
import kids_categories from '../../public/static/kids/header_content.json';
import { storage } from '../../util/localStorage';

export const MEN = "MEN";
export const WOMEN = "WOMEN";
export const KIDS = "KIDS";

export function Categories(header) {
  const typeId = storage.gettypeid();
  let type;

  switch (typeId) {
    case 1:
      type = MEN;
      break;
    case 2:
      type = WOMEN;
      break;
    case 3:
      type = KIDS;
      break;
    default:
      type = MEN;
  }

  const selectedCategories = {
    [MEN]: men_categories,
    [WOMEN]: women_categories,
    [KIDS]: kids_categories,
  };

  const mergedItems = [];

  if (selectedCategories[type]) {
    selectedCategories[type].forEach(category => {
      if(category.category == header)
      category.subcategories.forEach(subcategory => {
        mergedItems.push(...subcategory.items);
      });
    });
  }

  return mergedItems;
}

export function CategoriesHeader(header) {
  const typeId = storage.gettypeid();
  let type;

  switch (typeId) {
    case 1:
      type = MEN;
      break;
    case 2:
      type = WOMEN;
      break;
    case 3:
      type = KIDS;
      break;
    default:
      type = MEN;
  }

  const selectedCategories = {
    [MEN]: men_categories,
    [WOMEN]: women_categories,
    [KIDS]: kids_categories,
  };

  const mergedItems = [];

  if (selectedCategories[type]) {
    selectedCategories[type].forEach(category => {
      mergedItems.push(category.category);
      
    });
  }

  return mergedItems;
}
